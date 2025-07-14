import { SUPABASE_URL, SUPABASE_KEY } from '../src/supabase.js';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Input elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const messageDisplay = document.getElementById('messageDisplay');

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
  setMessage(messageDisplay, 'Cargando...');
  const { data, error } = await client.auth.signInWithPassword({
    email: emailInput.value,
    password: passwordInput.value
  });
  if (error || !data.user) {
    setMessage(messageDisplay, error ? error.message : 'Error de autenticaci\u00f3n');
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
