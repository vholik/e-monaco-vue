import { $api } from '@/shared/api/api'
import { useMutation } from 'vue-query'
import type { AuthData, AuthReponse } from '../types/auth'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage'

export const useLogin = () => {
  return useMutation(
    ['login'],
    async (data: AuthData) => {
      const response = await $api.post<AuthReponse>('authentication/signin', data)
      return response.data
    },
    {
      onSuccess: (data) => {
        localStorage.setItem(USER_LOCALSTORAGE_KEY, data.accessToken)
      }
    }
  )
}
