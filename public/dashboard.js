const SUPABASE_URL = 'https://bidklbjywxkxnotrtnps.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZGtsYmp5d3hreG5vdHJ0bnBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4MTgxMjAsImV4cCI6MjA2NjM5NDEyMH0.kDf2SnmRhvRhl_Hy6_ieFdf6L_qI5YJxt3RhrcKOUTc';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadData() {
  const { data: { session } } = await client.auth.getSession();
  if (!session) {
    window.location.href = '/login.html';
    return;
  }
  const userId = session.user.id;
  const { data: profile, error: profileError } = await client
    .from('users')
    .select('username')
    .eq('supabase_auth_id', userId)
    .single();
  if (profileError) {
    console.error(profileError);
    return;
  }
  document.getElementById('account').textContent = profile.username;

  const { data: resources, error: resourceError } = await client
    .from('player_resources')
    .select(
      'chrono_polvo, cristal_etereo, combustible_singularidad, nucleos_potencia, creditos_galacticos, sustancia_x'
    )
    .eq('player_id', userId)
    .single();
  if (resourceError) {
    console.error(resourceError);
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
  const list = document.getElementById('resources');
  list.innerHTML = '';
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
