const API_URL = 'https://bidklbjywxkxnotrtnps.supabase.co/rest/v1';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZGtsYmp5d3hreG5vdHJ0bnBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4MTgxMjAsImV4cCI6MjA2NjM5NDEyMH0.kDf2SnmRhvRhl_Hy6_ieFdf6L_qI5YJxt3RhrcKOUTc';

export async function api(path, options = {}) {
  options.headers = options.headers || {};
  options.headers['apikey'] = API_KEY;
  options.headers['Authorization'] = `Bearer ${API_KEY}`;
  options.headers['Content-Type'] = 'application/json';
  const res = await fetch(`${API_URL}${path}`, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

export async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function randomToken() {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join('');
}
