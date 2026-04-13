'use client';

import { useState, useRef } from 'react';
import { X, Plus, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { T } from '@/lib/design-tokens';
import { createClient } from '@/utils/supabase/client';

/**
 * 이미지 업로드 컴포넌트
 * @param {string[]} images - 현재 이미지 URL 배열
 * @param {function} onChange - URL 배열 변경 콜백
 * @param {string} folder - Storage 하위 폴더 (events / recruitments / posts)
 * @param {number} max - 최대 이미지 수 (기본 5)
 * @param {boolean} single - 단일 이미지 모드 (image_url 용)
 */
export default function ImageUploader({ images = [], onChange, folder = 'general', max = 5, single = false }) {
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef(null);

    const handleFiles = async (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        const remaining = single ? 1 : max - images.length;
        if (remaining <= 0) return alert(`최대 ${max}장까지 업로드할 수 있어요.`);
        const toUpload = files.slice(0, remaining);

        setUploading(true);
        try {
            const sb = createClient();
            const newUrls = [];

            for (const file of toUpload) {
                // 파일 크기 제한 (5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert(`${file.name}은(는) 5MB를 초과합니다.`);
                    continue;
                }

                // 이미지 타입 확인
                if (!file.type.startsWith('image/')) {
                    alert(`${file.name}은(는) 이미지 파일이 아닙니다.`);
                    continue;
                }

                const ext = file.name.split('.').pop();
                const path = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;

                const { error } = await sb.storage.from('images').upload(path, file, {
                    cacheControl: '3600',
                    upsert: false,
                });
                if (error) {
                    console.error('업로드 실패');
                    alert(`${file.name} 업로드에 실패했어요.`);
                    continue;
                }

                const { data: { publicUrl } } = sb.storage.from('images').getPublicUrl(path);
                newUrls.push(publicUrl);
            }

            if (newUrls.length > 0) {
                onChange(single ? [newUrls[0]] : [...images, ...newUrls]);
            }
        } catch (err) {
            console.error('이미지 업로드 에러');
            alert('이미지 업로드 중 오류가 발생했습니다.');
        } finally {
            setUploading(false);
            if (fileRef.current) fileRef.current.value = '';
        }
    };

    const handleRemove = (idx) => {
        const next = images.filter((_, i) => i !== idx);
        onChange(next);
    };

    const showAddBtn = single ? images.length === 0 : images.length < max;

    return (
        <div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {/* 기존 이미지 */}
                {images.map((url, i) => (
                    <div key={i} style={{ position: 'relative', width: 80, height: 80, borderRadius: T.radiusMd, overflow: 'hidden', border: `1px solid ${T.border}` }}>
                        <Image src={url} alt={`이미지 ${i + 1}`} fill style={{ objectFit: 'cover' }} sizes="80px" />
                        <div
                            onClick={() => handleRemove(i)}
                            style={{
                                position: 'absolute', top: 4, right: 4,
                                width: 20, height: 20, borderRadius: '50%',
                                background: 'rgba(0,0,0,0.6)', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                            }}
                        >
                            <X size={12} color="#fff" />
                        </div>
                    </div>
                ))}

                {/* 추가 버튼 */}
                {showAddBtn && (
                    <div
                        onClick={() => !uploading && fileRef.current?.click()}
                        style={{
                            width: 80, height: 80, borderRadius: T.radiusMd,
                            border: `1.5px dashed ${T.border}`, background: T.bg,
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center', gap: 4,
                            cursor: uploading ? 'default' : 'pointer',
                            opacity: uploading ? 0.5 : 1,
                        }}
                    >
                        {uploading ? (
                            <div style={{ fontSize: 11, color: T.gray }}>업로드중</div>
                        ) : (
                            <>
                                <Plus size={18} color={T.gray} />
                                <span style={{ fontSize: 10, color: T.gray }}>
                                    {single ? '사진' : `${images.length}/${max}`}
                                </span>
                            </>
                        )}
                    </div>
                )}
            </div>

            <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple={!single}
                onChange={handleFiles}
                style={{ display: 'none' }}
            />
        </div>
    );
}
