import { $api } from '@/shared/api/api'
import type { Ref } from 'vue'
import { useQuery } from 'vue-query'

export const useFreeTextOptions = (column: Ref<string>) => {
    const query = useQuery(
        ['free-text-options', column],
        async () => {
            const response = await $api.post('/persons', column.value)
            return response.data
        },
        { keepPreviousData: true },
    )

    return query
}
