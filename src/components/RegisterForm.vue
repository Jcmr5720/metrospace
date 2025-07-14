<script setup>
import { ref } from 'vue'
import { api, hashPassword } from '../supabase'

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const message = ref('')

async function register() {
  message.value = ''
  if (password.value !== confirmPassword.value) {
    message.value = 'Las contrase\u00f1as no coinciden'
    return
  }
  try {
    const hash = await hashPassword(password.value)
    const payload = {
      username: username.value,
      email: email.value,
      password_hash: hash,
      created_at: new Date().toISOString(),
    }
    await api('/users', { method: 'POST', body: JSON.stringify(payload) })
    message.value = 'Registro exitoso. Ahora puedes iniciar sesi\u00f3n.'
    username.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
  } catch (e) {
    message.value = e.message
  }
}
</script>

<template>
  <div class="auth-form">
    <h2>Registro</h2>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="Nombre de usuario" required />
      <input v-model="email" type="email" placeholder="Correo electr\u00f3nico" required />
      <input v-model="password" type="password" placeholder="Contrase\u00f1a" required />
      <input v-model="confirmPassword" type="password" placeholder="Confirmar contrase\u00f1a" required />
      <button type="submit">Registrarse</button>
    </form>
    <p class="message">{{ message }}</p>
  </div>
</template>

<style scoped src="../assets/auth.css"></style>
