import { $api } from '@/shared/api/api'
import type { Ref } from 'vue'
import { useQuery } from 'vue-query'

export const useMunicipalities = (
    selected?: Ref<string | string[]>,
    q?: Ref<string>,
) => {
    return useQuery(
        ['municipalities', selected, q],
        async () => {
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
        {
            initialData: [],
            keepPreviousData: true,
        },
    )
}
