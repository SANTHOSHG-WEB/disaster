import { createBrowserClient } from '@supabase/ssr'

const isBrowser = typeof window !== 'undefined'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

console.log("Initializing Supabase Client", { url: url ? "Present" : "Missing", key: anonKey ? "Present" : "Missing" });

export const supabase = isBrowser
    ? createBrowserClient(url, anonKey, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
        }
    })
    : null as any
