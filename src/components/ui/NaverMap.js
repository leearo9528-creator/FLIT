'use client';

import { useEffect, useRef, useState } from 'react';
import { T } from '@/lib/design-tokens';

const NAVER_MAP_SCRIPT_ID = 'naver-map-sdk';

function loadNaverMapScript() {
    return new Promise((resolve, reject) => {
        if (window.naver?.maps) { resolve(); return; }
        if (document.getElementById(NAVER_MAP_SCRIPT_ID)) {
            const check = setInterval(() => {
                if (window.naver?.maps) { clearInterval(check); resolve(); }
            }, 100);
            return;
        }
        const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
        if (!clientId) { reject(new Error('NEXT_PUBLIC_NAVER_MAP_CLIENT_ID 환경변수가 없습니다.')); return; }
        const script = document.createElement('script');
        script.id = NAVER_MAP_SCRIPT_ID;
        script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}&submodules=geocoder`;
        script.async = true;
        script.onload = () => {
            const check = setInterval(() => {
                if (window.naver?.maps) { clearInterval(check); resolve(); }
            }, 100);
        };
        script.onerror = () => reject(new Error('네이버 지도 스크립트 로드 실패'));
        document.head.appendChild(script);
    });
}

/**
 * 네이버 지도 컴포넌트
 * @param {number} lat - 위도 (기본: 서울시청)
 * @param {number} lng - 경도
 * @param {number} zoom - 줌 레벨 (기본: 15)
 * @param {string} height - 지도 높이 (기본: 250px)
 * @param {boolean} clickable - 클릭으로 마커 이동 가능 여부
 * @param {function} onLocationSelect - 클릭 시 콜백 ({ lat, lng, address })
 * @param {string} markerLabel - 마커 위 라벨
 */
export default function NaverMap({
    lat = 37.5665, lng = 126.978, zoom = 15, height = '250px',
    clickable = false, onLocationSelect, markerLabel,
}) {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const markerInstance = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        loadNaverMapScript()
            .then(() => {
                if (!mounted || !mapRef.current) return;
                const { naver } = window;
                const center = new naver.maps.LatLng(lat, lng);

                const map = new naver.maps.Map(mapRef.current, {
                    center,
                    zoom,
                    zoomControl: true,
                    zoomControlOptions: { position: naver.maps.Position.TOP_RIGHT },
                });
                mapInstance.current = map;

                const marker = new naver.maps.Marker({ position: center, map });
                markerInstance.current = marker;

                if (clickable) {
                    naver.maps.Event.addListener(map, 'click', (e) => {
                        const { _lat, _lng } = e.coord;
                        marker.setPosition(e.coord);
                        // Reverse Geocoding
                        naver.maps.Service.reverseGeocode(
                            { coords: new naver.maps.LatLng(_lat, _lng), orders: 'roadaddr,addr' },
                            (status, response) => {
                                let address = '';
                                if (status === naver.maps.Service.Status.OK) {
                                    const result = response.v2.results[0];
                                    if (result) {
                                        const r = result.region;
                                        const l = result.land;
                                        address = [
                                            r.area1?.name, r.area2?.name, r.area3?.name,
                                            l?.name, l?.number1, l?.number2 ? `-${l.number2}` : '',
                                        ].filter(Boolean).join(' ');
                                    }
                                }
                                onLocationSelect?.({ lat: _lat, lng: _lng, address });
                            }
                        );
                    });
                }
            })
            .catch((err) => { if (mounted) setError(err.message); });

        return () => { mounted = false; };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // 외부에서 lat/lng 변경 시 지도 이동
    useEffect(() => {
        if (!mapInstance.current || !window.naver?.maps) return;
        const pos = new window.naver.maps.LatLng(lat, lng);
        mapInstance.current.setCenter(pos);
        markerInstance.current?.setPosition(pos);
    }, [lat, lng]);

    if (error) return (
        <div style={{ height, background: T.grayLt, borderRadius: T.radiusMd, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: T.gray }}>
            지도를 불러올 수 없습니다
        </div>
    );

    return (
        <div style={{ position: 'relative' }}>
            <div ref={mapRef} style={{ width: '100%', height, borderRadius: T.radiusMd, overflow: 'hidden' }} />
            {markerLabel && (
                <div style={{
                    position: 'absolute', top: 8, left: 8,
                    background: T.white, borderRadius: T.radiusMd,
                    padding: '6px 12px', fontSize: 12, fontWeight: 700,
                    color: T.text, boxShadow: T.shadowSm,
                    border: `1px solid ${T.border}`,
                }}>
                    {markerLabel}
                </div>
            )}
        </div>
    );
}

/**
 * 주소 검색 + 지도 선택 컴포넌트
 * @param {string} value - 현재 주소
 * @param {function} onChange - ({ address, lat, lng }) 콜백
 */
export function AddressSearchMap({ value = '', onChange }) {
    const [keyword, setKeyword] = useState(value);
    const [results, setResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [coords, setCoords] = useState({ lat: 37.5665, lng: 126.978 });
    const [showMap, setShowMap] = useState(!!value);
    const debounceRef = useRef(null);

    useEffect(() => { setKeyword(value); }, [value]);

    const handleSearch = (q) => {
        setKeyword(q);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (!q.trim()) { setResults([]); return; }

        debounceRef.current = setTimeout(async () => {
            setSearching(true);
            try {
                await loadNaverMapScript();
                const { naver } = window;
                naver.maps.Service.geocode({ query: q }, (status, response) => {
                    if (status !== naver.maps.Service.Status.OK) { setResults([]); return; }
                    const items = response.v2.addresses || [];
                    setResults(items.map(a => ({
                        address: a.roadAddress || a.jibunAddress,
                        lat: parseFloat(a.y),
                        lng: parseFloat(a.x),
                    })));
                });
            } catch { setResults([]); }
            finally { setSearching(false); }
        }, 400);
    };

    const handleSelect = (item) => {
        setKeyword(item.address);
        setCoords({ lat: item.lat, lng: item.lng });
        setResults([]);
        setShowMap(true);
        onChange?.(item);
    };

    const handleMapClick = ({ lat, lng, address }) => {
        setCoords({ lat, lng });
        if (address) {
            setKeyword(address);
            onChange?.({ address, lat, lng });
        }
    };

    return (
        <div>
            {/* 검색 입력 */}
            <div style={{ position: 'relative' }}>
                <input
                    value={keyword}
                    onChange={e => handleSearch(e.target.value)}
                    placeholder="주소를 검색하세요 (예: 여의도 한강공원)"
                    style={{
                        width: '100%', padding: '12px 14px', fontSize: 14, color: T.text,
                        border: `1.5px solid ${keyword ? T.blue : T.border}`, borderRadius: T.radiusMd,
                        outline: 'none', background: T.bg, boxSizing: 'border-box',
                    }}
                />
                {results.length > 0 && (
                    <div style={{
                        position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
                        background: T.white, border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
                        boxShadow: T.shadowMd, maxHeight: 200, overflowY: 'auto', zIndex: 200,
                    }}>
                        {results.map((r, i) => (
                            <div key={i} onClick={() => handleSelect(r)} style={{
                                padding: '12px 16px', cursor: 'pointer', fontSize: 13, color: T.text,
                                borderBottom: i < results.length - 1 ? `1px solid ${T.border}` : 'none',
                            }}>
                                {r.address}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 지도 */}
            {showMap && (
                <div style={{ marginTop: 10 }}>
                    <NaverMap
                        lat={coords.lat} lng={coords.lng} zoom={16}
                        height="200px" clickable
                        onLocationSelect={handleMapClick}
                        markerLabel={keyword || '위치를 클릭하세요'}
                    />
                    <div style={{ fontSize: 11, color: T.gray, marginTop: 6 }}>
                        지도를 클릭하면 위치를 변경할 수 있어요
                    </div>
                </div>
            )}
        </div>
    );
}
