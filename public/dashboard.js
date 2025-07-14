import { SUPABASE_URL, SUPABASE_KEY } from '../src/supabase.js';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadData() {
  const accountEl = document.getElementById('account');
  const list = document.getElementById('resources');
  accountEl.textContent = 'Cargando...';
  list.innerHTML = '';

  const { data: { session } } = await client.auth.getSession();
  if (!session) {
    window.location.href = '/login.html';
    return;
  }
  const userId = session.user.id;
  const { data: profile, error: profileError } = await client
    .from('public.users')
    .select('username')
    .eq('supabase_auth_id', userId)
    .single();
  if (profileError) {
    accountEl.textContent = profileError.message;
    return;
  }
  accountEl.textContent = profile.username;

  const { data: resources, error: resourceError } = await client
    .from('public.player_resources')
    .select(
      'chrono_polvo, cristal_etereo, combustible_singularidad, nucleos_potencia, creditos_galacticos, sustancia_x'
    )
    .eq('player_id', userId)
    .single();
  if (resourceError) {
    accountEl.textContent = resourceError.message;
    return;
  }
  const resourceNames = {
    chrono_polvo: 'Chrono-Polvo',
    cristal_etereo: 'Cristal Etéreo',
    combustible_singularidad: 'Combustible Singularidad',
    nucleos_potencia: 'Núcleos de Potencia',
    creditos_galacticos: 'Créditos Galácticos',
    sustancia_x: 'Sustancia X'
  };
  Object.keys(resourceNames).forEach((key) => {
    const li = document.createElement('li');
    li.textContent = `${resourceNames[key]}: ${resources[key]}`;
    list.appendChild(li);
  });
}

async function logout() {
  await client.auth.signOut();
  window.location.href = '/login.html';
}

document.getElementById('logout').addEventListener('click', logout);

loadData();
