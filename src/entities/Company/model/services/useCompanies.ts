import { $api } from '@/shared/api/api'
import type { Ref } from 'vue'
import { useQuery } from 'vue-query'

export const useCompanies = (
    selected?: Ref<string | string[]>,
    q?: Ref<string>,
) => {
    const key = selected?.value
        ? Array.isArray(selected?.value)
            ? selected?.value.join(',')
            : selected?.value
        : ''

    const { data, ...rest } = useQuery(
        ['companies' + key, q],
        async () => {
            const response = await $api.get('companies', {
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

    return { data, ...rest }
}
