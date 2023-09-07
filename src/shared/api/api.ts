import axios from 'axios'

import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage'

export const $api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL
})

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = localStorage.getItem(USER_LOCALSTORAGE_KEY) || null
  }

  return config
})
