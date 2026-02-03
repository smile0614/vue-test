<template>
  <div class="account-entry">
    <el-form label-position="top" class="account-form">
      <el-form-item label="Метка" :error="errors.label">
        <el-input
          v-model="localLabelRaw"
          placeholder="Метки через ;"
          maxlength="50"
          show-word-limit
          :class="{ 'is-error': errors.label }"
          @blur="onBlurLabel"
        />
        <div class="form-hint">Введите текстовые метки через знак ;</div>
      </el-form-item>

      <el-form-item label="Тип записи" :error="errors.type">
        <el-select
          v-model="localType"
          placeholder="Выберите тип"
          class="full-width"
          :class="{ 'is-error': errors.type }"
          @change="onChangeType"
        >
          <el-option label="LDAP" value="LDAP" />
          <el-option label="Локальная" value="Локальная" />
        </el-select>
      </el-form-item>

      <el-form-item label="Логин" :error="errors.login" required>
        <el-input
          v-model="localLogin"
          placeholder="Логин"
          maxlength="101"
          show-word-limit
          :class="{ 'is-error': errors.login }"
          @blur="onBlurLogin"
        />
      </el-form-item>

      <el-form-item
        v-if="localType === 'Локальная'"
        label="Пароль"
        :error="errors.password"
        required
      >
        <el-input
          v-model="localPassword"
          type="password"
          placeholder="Пароль"
          maxlength="101"
          show-word-limit
          show-password
          :class="{ 'is-error': errors.password }"
          @blur="onBlurPassword"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="danger" plain @click="handleRemove">Удалить</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Account, AccountType } from '@/types/account'
import { useAccountsStore, labelsToRaw } from '@/stores/accounts'
import { validateAccount } from '@/utils/validation'

const props = defineProps<{
  account: Account
}>()

const emit = defineEmits<{
  remove: [id: string]
}>()

const store = useAccountsStore()

const localLabelRaw = ref(labelsToRaw(props.account.labels))
const localType = ref<AccountType>(props.account.type)
const localLogin = ref(props.account.login)
const localPassword = ref(props.account.type === 'Локальная' ? (props.account.password ?? '') : '')

const errors = ref<Partial<Record<'label' | 'type' | 'login' | 'password', string>>>({})

watch(
  () => props.account,
  (acc) => {
    localLabelRaw.value = labelsToRaw(acc.labels)
    localType.value = acc.type
    localLogin.value = acc.login
    localPassword.value = acc.type === 'Локальная' ? (acc.password ?? '') : ''
  },
  { deep: true }
)

function runValidationAndSave(): void {
  const result = validateAccount({
    labelRaw: localLabelRaw.value,
    type: localType.value,
    login: localLogin.value,
    password: localPassword.value,
  })
  errors.value = {
    label: result.label,
    login: result.login,
    password: result.password,
  }
  if (result.valid) {
    store.saveAccount(props.account.id, {
      labelRaw: localLabelRaw.value,
      type: localType.value,
      login: localLogin.value.trim(),
      password: localType.value === 'Локальная' ? localPassword.value : null,
    })
  }
}

function onBlurLabel(): void {
  runValidationAndSave()
}

function onBlurLogin(): void {
  runValidationAndSave()
}

function onBlurPassword(): void {
  runValidationAndSave()
}

function onChangeType(): void {
  if (localType.value === 'LDAP') {
    localPassword.value = ''
  }
  runValidationAndSave()
}

function handleRemove(): void {
  store.removeAccount(props.account.id)
  emit('remove', props.account.id)
}
</script>

<style scoped>
.account-entry {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
}
.account-form {
  max-width: 480px;
}
.full-width {
  width: 100%;
}
.form-hint {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-top: 4px;
}
:deep(.el-input.is-error .el-input__wrapper) {
  box-shadow: 0 0 0 1px var(--el-color-danger) inset;
}
</style>
