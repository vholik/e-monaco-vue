import type { ContactPerson } from '@/entities/ContactPerson'
import { useContactPersonsFilterStore } from '@/features/PersonsFilter'
import { $api } from '@/shared/api/api'
import { PAGE_SIZE } from '@/shared/const/pagination'
import { debounce } from 'lodash'
import { ref, type Ref } from 'vue'
import { useQueryClient, type UseQueryOptions } from '@tanstack/vue-query'

export type PersonsData = Ref<
    { count?: number; persons?: ContactPerson[] } | undefined
>

interface UsePersonsData {
    data: PersonsData
    isLoading: Ref<boolean>
    setPageSize: (pageSize: number) => void
}

export const usePersonsData = (): UsePersonsData => {
    const personFilterStore = useContactPersonsFilterStore()
    const filters = ref(personFilterStore.$state)
    const data: PersonsData = ref(undefined)
    const isLoading = ref(false)
    const queryClient = useQueryClient()

    const setPageSize = async (pageSize: number) => {
        filters.value.take = pageSize
        await queryClient.invalidateQueries({ queryKey: ['persons'] })

        setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['persons'] })
        }, 1000)
    }

    personFilterStore.$subscribe(
        debounce((_, state) => {
            Object.assign(filters.value, state)
            queryClient.invalidateQueries({ queryKey: ['persons'] })
        }, 500),
    )

    return {
        data,
        isLoading,
        setPageSize,
    }
}
