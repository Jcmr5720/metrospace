<script setup>
import { ref } from 'vue'
import { api, hashPassword, randomToken } from '../supabase'

const identifier = ref('')
const password = ref('')
const message = ref('')

async function login() {
  message.value = ''
  try {
    const hash = await hashPassword(password.value)
    let users = await api(`/users?username=eq.${encodeURIComponent(identifier.value)}&select=id,password_hash`)
    if (!users.length) {
      users = await api(`/users?email=eq.${encodeURIComponent(identifier.value)}&select=id,password_hash`)
    }
    if (!users.length) {
      message.value = 'Usuario no encontrado'
      return
    }
    const user = users[0]
    if (user.password_hash !== hash) {
      message.value = 'Contrase\u00f1a incorrecta'
      return
    }
    const token = randomToken()
    const session = {
      user_id: user.id,
      session_token: token,
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    }
    await api('/sessions', { method: 'POST', body: JSON.stringify(session) })
    localStorage.setItem('session_token', token)
    message.value = 'Sesión iniciada correctamente'
  } catch (e) {
    message.value = e.message
  }
}
</script>

<template>
  <div class="auth-form">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="identifier" placeholder="Nombre de usuario o correo" required />
      <input v-model="password" type="password" placeholder="Contrase\u00f1a" required />
      <button type="submit">Iniciar sesi\u00f3n</button>
    </form>
    <p class="message">{{ message }}</p>
  </div>
</template>

<style scoped src="../assets/auth.css"></style>
