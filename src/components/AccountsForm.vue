<template>
  <div class="accounts-form">
    <header class="form-header">
      <h1 class="form-title">Учётные записи</h1>
      <el-button type="primary" :icon="Plus" @click="handleAdd">Добавить учётную запись</el-button>
    </header>

    <p class="form-hint-top">Поле «Метка»: введите текстовые метки через знак ; (необязательно, макс. 50 символов).</p>

    <div class="accounts-list">
      <AccountEntry
        v-for="account in accounts"
        :key="account.id"
        :account="account"
        @remove="onRemove"
      />
    </div>

    <div v-if="accounts.length === 0" class="empty-state">
      Нет учётных записей. Нажмите «Добавить учётную запись», чтобы создать первую.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { useAccountsStore } from '@/stores/accounts'
import AccountEntry from './AccountEntry.vue'

const store = useAccountsStore()

const accounts = computed(() => store.accounts)

function handleAdd(): void {
  store.addAccount()
}

function onRemove(): void {
  // Удаление уже выполнено в сторе из AccountEntry
}
</script>

<style scoped>
.accounts-form {
  max-width: 640px;
  margin: 0 auto;
}
.form-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.form-title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
}
.form-hint-top {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  margin: 0 0 20px;
  line-height: 1.5;
}
.accounts-list {
  margin-bottom: 24px;
}
.empty-state {
  text-align: center;
  padding: 40px 20px;
  background: #fff;
  border-radius: 8px;
  color: var(--el-text-color-secondary);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
</style>
