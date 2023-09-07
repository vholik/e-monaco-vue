import * as yup from 'yup'
import type { AuthData } from '../types/auth'

export const loginValidationSchema: yup.ObjectSchema<AuthData> = yup.object().shape({
  email: yup
    .string()
    .email('E-mail nie jest poprawny')
    .required(() => `Pole jest obowiązkowe`),
  password: yup
    .string()
    .min(8, (data) => `Hasło musi mieć przynajmniej ${data.min} liter`)
    .required(() => `Pole jest obowiązkowe`)
    .label('Password')
})
