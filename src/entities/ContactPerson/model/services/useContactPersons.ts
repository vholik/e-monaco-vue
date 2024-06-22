import { $api } from '@/shared/api/api'
import type { Ref } from 'vue'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'

export const useContactPersons = (
    refValue: Ref<string>,
    selectedRef: Ref<string[]>,
    key?: Ref<string[] | undefined>,
) => {
    return useQuery({
        queryKey: ['contact-persons', refValue, key],
        queryFn: async () => {
            const response = await $api.get(`persons`, {
                params: { q: refValue.value, selected: selectedRef.value },
            })

            return response.data
        },
        initialData: [],
        placeholderData: (previous) => previous,
    })
}
