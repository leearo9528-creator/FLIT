'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

const AuthContext = createContext({ user: null, loading: true, plan: 'free', signOut: async () => {} });

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [plan, setPlan] = useState('free');

    const fetchPlan = async (uid) => {
        const sb = createClient();
        const { data } = await sb.from('profiles').select('plan').eq('id', uid).single();
        setPlan(data?.plan ?? 'free');
    };

    useEffect(() => {
        const sb = createClient();

        // 현재 세션 확인
        sb.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            if (session?.user) fetchPlan(session.user.id);
            setLoading(false);
        });

        // 인증 상태 변경 리스너
        const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) fetchPlan(session.user.id);
            else setPlan('free');
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        const sb = createClient();
        await sb.auth.signOut();
        setUser(null);
        setPlan('free');
    };

    return (
        <AuthContext.Provider value={{ user, loading, plan, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
