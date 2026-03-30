'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { timeAgo } from '@/lib/helpers';
import { createClient } from '@/utils/supabase/client';

const TYPE_META = {
    '리뷰승인':  { icon: '✏️', color: '#F59E0B' },
    '공고마감':  { icon: '🎪', color: '#EF4444' },
    '신고처리':  { icon: '🚨', color: '#EF4444' },
    '구독지급':  { icon: '🎁', color: '#10B981' },
    '기타':      { icon: '📢', color: '#6366F1' },
    default:     { icon: '🔔', color: '#6B7280' },
};


function groupByDate(items) {
    const today = new Date(); today.setHours(0,0,0,0);
    const weekAgo = new Date(today); weekAgo.setDate(weekAgo.getDate() - 7);
    const groups = { today: [], week: [], older: [] };
    for (const n of items) {
        const d = new Date(n.created_at); d.setHours(0,0,0,0);
        if (d >= today)        groups.today.push(n);
        else if (d >= weekAgo) groups.week.push(n);
        else                   groups.older.push(n);
    }
    return groups;
}

function NotifItem({ notif, onRead }) {
    const meta = TYPE_META[notif.type] || TYPE_META.default;
    const router = useRouter();

    const handleClick = async () => {
        if (!notif.is_read) await onRead(notif.id);
        if (notif.link) router.push(notif.link);
    };

    return (
        <div
            onClick={handleClick}
            style={{
                display: 'flex', alignItems: 'flex-start', gap: 14,
                padding: '16px 20px', cursor: notif.link ? 'pointer' : 'default',
                background: notif.is_read ? 'transparent' : 'rgba(59,130,246,0.04)',
                borderBottom: `1px solid ${T.border}`,
                transition: 'background 0.15s',
            }}
        >
            {/* 아이콘 */}
            <div style={{
                width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                background: `${meta.color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, position: 'relative',
            }}>
                {meta.icon}
                {!notif.is_read && (
                    <div style={{
                        position: 'absolute', top: 2, right: 2,
                        width: 8, height: 8, borderRadius: '50%',
                        background: T.blue, border: '1.5px solid #fff',
                    }} />
                )}
            </div>

            {/* 내용 */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                    fontSize: 13, color: T.textSub, lineHeight: 1.5,
                    display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    fontWeight: notif.is_read ? 400 : 600,
                }}>
                    {notif.message}
                </div>
                <div style={{ fontSize: 12, color: T.gray, marginTop: 5 }}>
                    {timeAgo(notif.created_at)}
                </div>
            </div>
        </div>
    );
}

function GroupSection({ label, items, onRead }) {
    if (!items.length) return null;
    return (
        <div>
            <div style={{
                padding: '14px 20px 8px',
                fontSize: 12, fontWeight: 700, color: T.gray,
                background: T.bg,
            }}>
                {label}
            </div>
            {items.map(n => <NotifItem key={n.id} notif={n} onRead={onRead} />)}
        </div>
    );
}

export default function NotificationDrawer({ open, onClose, userId }) {
    const [notifs, setNotifs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userId) return;
        setLoading(true);
        (async () => {
            const sb = createClient();
            const { data, error } = await sb
                .from('notifications')
                .select('id, user_id, type, title, body, link, is_read, created_at')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
                .limit(50);
            if (error) console.error('알림 로드 실패:', error);
            if (data) setNotifs(data);
            setLoading(false);
        })();
    }, [userId]);

    const handleRead = async (id) => {
        setNotifs(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
        const sb = createClient();
        await sb.from('notifications').update({ is_read: true }).eq('id', id);
    };

    const handleReadAll = async () => {
        setNotifs(prev => prev.map(n => ({ ...n, is_read: true })));
        const sb = createClient();
        await sb.from('notifications').update({ is_read: true }).eq('user_id', userId).eq('is_read', false);
    };

    const unreadCount = notifs.filter(n => !n.is_read).length;
    const groups = groupByDate(notifs);

    return (
        <>
            {/* 배경 dim */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed', inset: 0, zIndex: 200,
                    background: 'rgba(0,0,0,0.4)',
                    opacity: open ? 1 : 0,
                    pointerEvents: open ? 'auto' : 'none',
                    transition: 'opacity 0.25s',
                }}
            />

            {/* 패널 */}
            <div style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 201,
                width: '100%', maxWidth: 430,
                background: T.white,
                transform: open ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.3s cubic-bezier(0.32,0.72,0,1)',
                display: 'flex', flexDirection: 'column',
                boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
            }}>
                {/* 헤더 */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '18px 20px 14px',
                    borderBottom: `1px solid ${T.border}`,
                    flexShrink: 0,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ fontSize: 18, fontWeight: 900, color: T.text }}>알림</div>
                        {unreadCount > 0 && (
                            <div style={{
                                background: T.blue, color: '#fff',
                                fontSize: 11, fontWeight: 800,
                                padding: '2px 8px', borderRadius: 20,
                                minWidth: 20, textAlign: 'center',
                            }}>
                                {unreadCount}
                            </div>
                        )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {unreadCount > 0 && (
                            <div
                                onClick={handleReadAll}
                                style={{ fontSize: 13, color: T.blue, fontWeight: 600, cursor: 'pointer' }}
                            >
                                모두 읽음
                            </div>
                        )}
                        <div onClick={onClose} style={{ cursor: 'pointer', padding: 4 }}>
                            <X size={22} color={T.gray} />
                        </div>
                    </div>
                </div>

                {/* 목록 */}
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {loading ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                            {Array(6).fill(0).map((_, i) => (
                                <div key={i} style={{
                                    display: 'flex', gap: 14, padding: '16px 20px',
                                    borderBottom: `1px solid ${T.border}`,
                                }}>
                                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: T.grayLt, flexShrink: 0, animation: 'pulse 1.5s infinite' }} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ height: 14, background: T.grayLt, borderRadius: 6, marginBottom: 8, width: '60%', animation: 'pulse 1.5s infinite' }} />
                                        <div style={{ height: 12, background: T.grayLt, borderRadius: 6, width: '85%', animation: 'pulse 1.5s infinite' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : notifs.length === 0 ? (
                        <div style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            justifyContent: 'center', padding: '80px 20px',
                            color: T.gray,
                        }}>
                            <div style={{ fontSize: 52, marginBottom: 16, opacity: 0.4 }}>🔔</div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 6 }}>알림이 없어요</div>
                            <div style={{ fontSize: 13, color: T.gray, textAlign: 'center', lineHeight: 1.6 }}>
                                새로운 댓글, 좋아요, 공고 소식을<br />여기서 확인할 수 있어요
                            </div>
                        </div>
                    ) : (
                        <>
                            <GroupSection label="오늘" items={groups.today} onRead={handleRead} />
                            <GroupSection label="이번 주" items={groups.week} onRead={handleRead} />
                            <GroupSection label="이전" items={groups.older} onRead={handleRead} />
                        </>
                    )}
                </div>
            </div>

        </>
    );
}
