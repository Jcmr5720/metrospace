<script setup>
import { ref } from 'vue'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'

const page = ref('login')
</script>

<template>
  <div class="page-toggle">
    <button :class="{ active: page === 'login' }" @click="page = 'login'">Login</button>
    <button :class="{ active: page === 'register' }" @click="page = 'register'">Registro</button>
  </div>
  <LoginForm v-if="page === 'login'" />
  <RegisterForm v-else />
</template>

<style scoped>
.page-toggle {
  text-align: center;
  margin-bottom: 2rem;
}
.page-toggle button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: var(--color-background-soft);
  cursor: pointer;
}
.page-toggle .active {
  background: hsl(160, 100%, 37%);
  color: #fff;
}
</style>
