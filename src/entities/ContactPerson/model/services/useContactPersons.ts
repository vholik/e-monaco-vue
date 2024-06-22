import { $api } from '@/shared/api/api'
import type { Ref } from 'vue'
import { useQuery } from 'vue-query'

export const useContactPersons = (
    inputValue: Ref<string> | null,
    selectedRef: Ref<string[]>,
    key?: Ref<string[] | undefined>,
) => {
    return useQuery(
        ['persons', inputValue, key],
        async () => {
            const response = await $api.get(`persons`, {
                params: { q: inputValue?.value, selected: selectedRef?.value },
            })

            return response.data
        },
        {
            initialData: [],
            keepPreviousData: true,
            refetchOnWindowFocus: false,
        },
    )
}
