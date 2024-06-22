import { $api } from '@/shared/api/api'
import { useQuery } from '@tanstack/vue-query'

export const useContactHistories = (id: string) => {
    return useQuery({
        queryFn: async () => {
            const response = await $api.get(`contact-histories/${id}`)

            return response.data
        },
        queryKey: ['contact-histories', id],
    })
}
