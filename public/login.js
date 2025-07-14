const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function setMessage(el, msg) {
  el.textContent = msg;
}

async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const msg = document.getElementById('login-message');
  setMessage(msg, 'Cargando...');
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error || !data.user) {
    setMessage(msg, error ? error.message : 'Error de autenticaci\u00f3n');
    return;
  }
  window.location.href = '/dashboard.html';
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const msg = document.getElementById('register-message');
  setMessage(msg, 'Cargando...');
  const { data, error } = await client.auth.signUp({ email, password });
  if (error || !data.user) {
    setMessage(msg, error ? error.message : 'Error de registro');
    return;
  }
  const userId = data.user.id;
  const passwordHash = await hashPassword(password);
  const { error: insertError } = await client.from('public.users').insert({
    supabase_auth_id: userId,
    username,
    password_hash: passwordHash,
    email
  });
  if (insertError) {
    setMessage(msg, insertError.message);
    return;
  }
  await client.from('public.player_resources').insert({ player_id: userId });
  window.location.href = '/dashboard.html';
});
