import { $api } from '@/shared/api/api'
import { useQuery } from 'vue-query'

export const useCompanies = () => {
    return useQuery(['companies'], async () => {
        const response = await $api.get('companies')

        return response.data
    })
}
