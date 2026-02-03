import { defineStore } from 'pinia'
import type { Account, AccountType, LabelItem } from '@/types/account'

/** Преобразует строку меток (через ";") в массив { text: элемент } */
export function parseLabelRaw(raw: string): LabelItem[] {
  if (!raw.trim()) return []
  return raw
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((text) => ({ text }))
}

/** Обратное преобразование: массив меток в строку для поля ввода */
export function labelsToRaw(labels: LabelItem[]): string {
  return labels.map((l) => l.text).join('; ')
}

function generateId(): string {
  return `acc_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
  }),

  actions: {
    addAccount(): string {
      const id = generateId()
      this.accounts.push({
        id,
        labels: [],
        type: 'Локальная',
        login: '',
        password: null,
      })
      return id
    },

    removeAccount(id: string): void {
      this.accounts = this.accounts.filter((a: Account) => a.id !== id)
    },

    /** Сохраняет/обновляет учётную запись из данных формы (вызывать после успешной валидации) */
    saveAccount(
      id: string,
      payload: {
        labelRaw: string
        type: AccountType
        login: string
        password: string | null
      }
    ): void {
      const labels = parseLabelRaw(payload.labelRaw)
      const existing = this.accounts.find((a: Account) => a.id === id)
      if (existing) {
        existing.labels = labels
        existing.type = payload.type
        existing.login = payload.login
        existing.password = payload.password
      } else {
        this.accounts.push({
          id,
          labels,
          type: payload.type,
          login: payload.login,
          password: payload.password,
        })
      }
    },
  },

  persist: true,
})
