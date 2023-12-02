import { $api } from '@/shared/api/api'
import type { Ref } from 'vue'
import { useQuery } from 'vue-query'

export const useContactPersons = (
    refValue: Ref<string>,
    selectedRef: Ref<string[]>,
    key?: Ref<string[] | undefined>,
) => {
    return useQuery(
        [refValue, key],
        async () => {
            const response = await $api.get(`persons`, {
                params: { q: refValue.value, selected: selectedRef.value },
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
