import { $api } from '@/shared/api/api'
import type { Ref } from 'vue'
import { useQuery } from 'vue-query'

export const useFreeTextOptions = (column: Ref<string>) => {
    const query = useQuery(
        ['free-text-options', column],
        async () => {
            if (!column.value) return []

            const response = await $api.get(
                `/companies/values/${column.value}`,
                column.value,
            )
            return response.data
        },
        { keepPreviousData: true },
    )

    return query
}
