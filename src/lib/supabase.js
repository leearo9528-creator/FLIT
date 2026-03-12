import { createClient } from '@supabase/supabase-js';

let supabase = null;

export function getSupabase() {
    if (supabase) return supabase;
    supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    return supabase;
}
