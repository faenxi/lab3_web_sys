<script setup lang="ts">
import Users from './components/Users.vue'
</script>

<template>
  <main class="app">
    <h1 class="app__title">Користувачі</h1>
    <Users />
  </main>
</template>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px 64px;
}

.app__title {
  margin: 0 0 24px;
  font-size: 2rem;
}
</style>
