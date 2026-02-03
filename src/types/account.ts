/** Тип записи учётной записи */
export type AccountType = 'LDAP' | 'Локальная'

/** Элемент метки (для хранения в стейте) */
export interface LabelItem {
  text: string
}

/** Учётная запись в хранилище (как сохраняется в Pinia) */
export interface Account {
  id: string
  /** Массив объектов { text: элемент метки } */
  labels: LabelItem[]
  type: AccountType
  login: string
  /** null для LDAP, строка для Локальная */
  password: string | null
}

/** Локальное состояние одной записи в форме (до валидации и сохранения) */
export interface AccountFormState {
  id: string
  labelRaw: string
  type: AccountType
  login: string
  password: string
  /** Ошибки валидации по полям */
  errors: Partial<Record<keyof Pick<AccountFormState, 'login' | 'password'>, string>>
}
