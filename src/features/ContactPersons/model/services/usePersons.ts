import { useQuery } from 'vue-query'
import { $api } from '@/shared/api/api'
import type { Ref } from 'vue'

export const usePersons = (
    refValue: Ref<string>,
    selectedRef: Ref<string[]>,
) => {
    if (!refValue.value) refValue.value = 'initial value'
    if (!selectedRef.value) selectedRef.value = []

    return useQuery(
        ['persons', refValue],
        async () => {
            const response = await $api.get(`persons`, {
                params: { q: refValue.value, selected: selectedRef.value },
            })

            return response.data
        },
        {
            initialData: [],
            keepPreviousData: true,
        },
    )
}
