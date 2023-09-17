import { $api } from '@/shared/api/api'
import { useQuery } from 'vue-query'

export const useContactPersons = () => {
    return useQuery(
        ['contact-persons'],
        async () => {
            const response = await $api.get('persons')

            return response.data
        },
        {
            initialData: [],
        },
    )
}
