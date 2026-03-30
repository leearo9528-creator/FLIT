'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

const AuthContext = createContext({ user: null, loading: true, plan: 'free', reviewCount: 0, signOut: async () => {}, refreshPlan: async () => {} });

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [plan, setPlan] = useState('free');
    const [reviewCount, setReviewCount] = useState(0);

    const fetchPlan = async (uid) => {
        const sb = createClient();
        const { data } = await sb.from('profiles').select('plan, review_count').eq('id', uid).single();
        setPlan(data?.plan ?? 'free');
        setReviewCount(data?.review_count ?? 0);
    };

    useEffect(() => {
        const sb = createClient();
        let realtimeChannel = null;

        sb.auth.getSession().then(async ({ data: { session } }) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                await fetchPlan(session.user.id);
            }
            setLoading(false);
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
    };

    const refreshPlan = async () => {
        if (user) await fetchPlan(user.id);
    };

    return (
        <AuthContext.Provider value={{ user, loading, plan, reviewCount, signOut, refreshPlan }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
