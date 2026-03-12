'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { getSupabase } from '@/lib/supabase';

const AuthContext = createContext({ user: null, loading: true, signOut: async () => {} });

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sb = getSupabase();

        // 현재 세션 확인
        sb.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // 인증 상태 변경 리스너
        const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        const sb = getSupabase();
        await sb.auth.signOut();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
