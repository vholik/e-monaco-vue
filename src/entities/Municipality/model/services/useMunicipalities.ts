import { $api } from '@/shared/api/api'
import type { Ref } from 'vue'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'

export const useMunicipalities = (
    selected?: Ref<string | string[]>,
    q?: Ref<string>,
) => {
    return useQuery({
        queryKey: ['municipalities', selected, q],
        queryFn: async () => {
            const response = await $api.get('municipalities', {
                params: {
                    q: q?.value,
                    selected: selected?.value
                        ? Array.isArray(selected?.value)
                            ? selected?.value
                            : [selected?.value]
                        : null,
                },
            })

            return response.data
        },
        initialData: { municipalities: [] },
        placeholderData: (previous) => previous,
    })
}
