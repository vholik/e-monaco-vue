import { $api } from '@/shared/api/api'
import type { Ref } from 'vue'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'

export const useFreeTextOptions = (column: Ref<string>) => {
    const query = useQuery({
        queryKey: ['free-text-options', column],
        queryFn: async () => {
            if (!column.value) return []

            const response = await $api.get(
                `/companies/values/${column.value}`,
                column.value,
            )
            return response.data
        },
        placeholderData: (previous) => previous,
    })

    return query
}
