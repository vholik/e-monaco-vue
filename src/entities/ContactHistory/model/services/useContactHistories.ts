import { $api } from '@/shared/api/api'
import { useQuery } from 'vue-query'

export const useContactHistories = (id: string) => {
    return useQuery(['contact-histories', id], async () => {
        const response = await $api.get(`contact-histories/${id}`)

        return response.data
    })
}
