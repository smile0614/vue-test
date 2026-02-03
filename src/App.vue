<template>
  <div class="app">
    <AccountsForm />
  </div>
</template>

<script setup lang="ts">
import AccountsForm from '@/components/AccountsForm.vue'
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  background: #f5f7fa;
}
.app {
  min-height: 100vh;
  padding: 24px;
}
</style>
