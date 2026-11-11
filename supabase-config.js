// Public browser credentials (not a service-role secret); database and storage access
// are protected by Supabase row-level security policies.
export const SUPABASE_URL = "https://maypmqnjkdrdqcssnvty.supabase.co";
export const SUPABASE_PUBLIC_KEY = "sb_publishable_uorMl6G618tavZGF8MQpfQ_2Pg3AIlE";
export const ADMIN_EMAIL = "peppegallo812329@gmail.com";
// Authorized admin e-mails, stored only as SHA-256 hashes (lowercase e-mail).
// The real protection is the Supabase RLS policy (function public.gg_is_admin).
export const ADMIN_EMAIL_HASHES = [
  "408fc5516943075340595c584cd6c301199bcf5e0fc035653fc088009c29b5e6", // principale (Giuseppe)
  "6db5fb70b549a1d96e9eeef95c28d5d57d88282a8fb75e292bfe34a98582c026"  // secondaria
];
export const EVENTS_TABLE = "gg_events";
export const MEDIA_BUCKET = "gg-media";
export const publicImageUrl = path => `${SUPABASE_URL}/storage/v1/object/public/${MEDIA_BUCKET}/${path.split("/").map(encodeURIComponent).join("/")}`;
export const BASE_HEADERS = { apikey: SUPABASE_PUBLIC_KEY };
