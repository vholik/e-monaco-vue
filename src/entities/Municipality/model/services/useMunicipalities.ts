import { $api } from '@/shared/api/api'
import { useQuery } from 'vue-query'

export const useMunicipalities = () => {
    return useQuery(
        ['municipalities'],
        async () => {
            const response = await $api.get('municipalities')

            return response.data
        },
        {
            initialData: [],
        },
    )
}
