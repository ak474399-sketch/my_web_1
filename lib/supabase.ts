import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/** Browser / client-side Supabase (uses anon key, respects RLS) */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** Server-side only — bypasses RLS, never expose to the client */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
