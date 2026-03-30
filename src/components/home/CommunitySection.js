'use client';

import Link from 'next/link';
import { T } from '@/lib/design-tokens';
import { timeAgo } from '@/lib/helpers';

function PostItem({ post }) {
    return (
        <Link href={`/community/${post.id}`} style={{ textDecoration: 'none' }}>
            <div style={{
                background: T.white, borderRadius: T.radiusLg, padding: '14px 16px',
                border: `1px solid ${T.border}`,
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                        {post.category && (
                            <span style={{ fontSize: 11, fontWeight: 600, color: T.blue, background: T.blueLt, padding: '2px 7px', borderRadius: 4 }}>
                                {post.category}
                            </span>
                        )}
                    </div>
                    <span style={{ fontSize: 11, color: T.gray }}>{timeAgo(post.created_at)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <div style={{
                        fontSize: 15, fontWeight: 800, color: T.text, lineHeight: 1.4,
                        display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        flex: 1,
                    }}>
                        {post.title}
                    </div>
                    <span style={{ fontSize: 16, color: T.gray, flexShrink: 0 }}>›</span>
                </div>
            </div>
        </Link>
    );
}

export default function CommunitySection({ posts }) {
    return (
        <div style={{ marginBottom: 24 }}>
            <div style={{
                padding: '0 16px 10px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>📌 커뮤니티</div>
                <Link href="/community" style={{ fontSize: 13, color: T.blue, fontWeight: 600, textDecoration: 'none' }}>전체보기 →</Link>
            </div>
            <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {posts.length === 0
                    ? <div style={{ textAlign: 'center', padding: '24px 0', color: T.gray, fontSize: 14 }}>아직 게시글이 없어요.</div>
                    : posts.map(post => <PostItem key={post.id} post={post} />)
                }
            </div>
        </div>
    );
}
