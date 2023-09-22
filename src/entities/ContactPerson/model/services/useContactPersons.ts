import { $api } from '@/shared/api/api'
import type { Ref } from 'vue'

import { useQuery } from 'vue-query'

export const useContactPersons = (
    refValue: Ref<string>,
    selectedRef: Ref<string[]>,
) => {
    return useQuery(
        ['contact-persons', refValue],
        async () => {
            const response = await $api.get(`persons`, {
                params: { q: refValue.value, selected: selectedRef.value },
            })

            return response.data
        },
        {
            initialData: [],
        },
    )
}
