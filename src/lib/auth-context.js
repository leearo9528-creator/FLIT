'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

const AuthContext = createContext({ user: null, loading: true, plan: 'free', signOut: async () => {}, refreshPlan: async () => {} });

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
        let realtimeChannel = null;

        sb.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchPlan(session.user.id);
                // profiles 변경 실시간 구독
                realtimeChannel = sb
                    .channel('profile-plan')
                    .on('postgres_changes', {
                        event: 'UPDATE', schema: 'public', table: 'profiles',
                        filter: `id=eq.${session.user.id}`,
                    }, (payload) => {
                        if (payload.new?.plan) setPlan(payload.new.plan);
                    })
                    .subscribe();
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
    };

    const refreshPlan = async () => {
        if (user) await fetchPlan(user.id);
    };

    return (
        <AuthContext.Provider value={{ user, loading, plan, signOut, refreshPlan }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
