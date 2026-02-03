const MAX_LABEL = 50
const MAX_LOGIN = 100
const MAX_PASSWORD = 100

export interface ValidationResult {
  valid: boolean
  login?: string
  password?: string
  label?: string
}

export function validateAccount(params: {
  labelRaw: string
  type: 'LDAP' | 'Локальная'
  login: string
  password: string
}): ValidationResult {
  const errors: ValidationResult = { valid: true }

  if (params.labelRaw.length > MAX_LABEL) {
    errors.valid = false
    errors.label = `Максимум ${MAX_LABEL} символов`
  }

  const loginTrimmed = params.login.trim()
  if (!loginTrimmed) {
    errors.valid = false
    errors.login = 'Обязательное поле'
  } else if (loginTrimmed.length > MAX_LOGIN) {
    errors.valid = false
    errors.login = `Максимум ${MAX_LOGIN} символов`
  }

  if (params.type === 'Локальная') {
    const pwd = params.password
    if (!pwd || !pwd.trim()) {
      errors.valid = false
      errors.password = 'Обязательное поле'
    } else if (params.password.length > MAX_PASSWORD) {
      errors.valid = false
      errors.password = `Максимум ${MAX_PASSWORD} символов`
    }
  }

  return errors
}
