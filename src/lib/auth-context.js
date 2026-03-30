'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

function canViewReviewsNow(lastReviewAt) {
    if (!lastReviewAt) return false;
    const now = new Date();
    // 가장 최근 월요일 00:00 (리셋 시점) 계산
    const day = now.getDay(); // 0=일, 1=월, ...
    const sinceMonday = day === 0 ? 6 : day - 1; // 월요일로부터 며칠 지났는지
    const lastMonday = new Date(now);
    lastMonday.setDate(now.getDate() - sinceMonday);
    lastMonday.setHours(0, 0, 0, 0);
    return new Date(lastReviewAt) >= lastMonday;
}

const AuthContext = createContext({ user: null, loading: true, plan: 'free', reviewCount: 0, canViewReviews: false, signOut: async () => {}, refreshPlan: async () => {} });

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [plan, setPlan] = useState('free');
    const [reviewCount, setReviewCount] = useState(0);
    const [canViewReviews, setCanViewReviews] = useState(false);

    const fetchPlan = async (uid) => {
        try {
            const sb = createClient();
            const { data, error } = await sb.from('profiles').select('plan, review_count, last_review_at').eq('id', uid).single();
            if (error) throw error;
            setPlan(data?.plan ?? 'free');
            setReviewCount(data?.review_count ?? 0);
            setCanViewReviews(canViewReviewsNow(data?.last_review_at));
        } catch (err) {
            console.error('프로필 로드 실패:', err);
        }
    };

    useEffect(() => {
        const sb = createClient();
        let realtimeChannel = null;

        sb.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
            if (session?.user) fetchPlan(session.user.id);
        });

        const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) fetchPlan(session.user.id);
            else setPlan('free');
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
            if (realtimeChannel) realtimeChannel.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        const sb = createClient();
        await sb.auth.signOut();
        setUser(null);
        setPlan('free');
        setReviewCount(0);
        setCanViewReviews(false);
    };

    const refreshPlan = async () => {
        if (user) await fetchPlan(user.id);
    };

    return (
        <AuthContext.Provider value={{ user, loading, plan, reviewCount, canViewReviews, signOut, refreshPlan }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
