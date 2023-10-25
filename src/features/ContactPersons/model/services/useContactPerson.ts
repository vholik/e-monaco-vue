import type { ContactPerson } from '@/entities/ContactPerson'
import { useContactPersonsFilterStore } from '@/features/PersonsFilter'
import { $api } from '@/shared/api/api'
import { PAGE_SIZE } from '@/shared/const/pagination'
import { debounce } from 'lodash'
import { ref, type Ref } from 'vue'
import { useQuery } from 'vue-query'

export type PersonsData = Ref<
    { count?: number; persons?: ContactPerson[] } | undefined
>

interface UsePersonsData {
    data: PersonsData
    isLoading: Ref<boolean>
}

export const usePersons = (): UsePersonsData => {
    const personFilterStore = useContactPersonsFilterStore()
    const filters = ref<typeof personFilterStore.$state | null>(null)

    const query = useQuery(
        ['persons-filtered', filters],
        async () => {
            const page = filters.value?.page || 1
            const response = await $api.get('persons/filtered', {
                params: {
                    ...filters.value,
                    skip: (page - 1) * PAGE_SIZE,
                    page: undefined,
                },
            })

            return response.data
        },
        { keepPreviousData: true },
    )

    personFilterStore.$subscribe(
        debounce((_, state) => {
            filters.value = state
        }, 500),
    )

    return query
}
