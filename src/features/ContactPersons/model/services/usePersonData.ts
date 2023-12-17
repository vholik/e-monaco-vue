import type { ContactPerson } from '@/entities/ContactPerson'
import { useContactPersonsFilterStore } from '@/features/PersonsFilter'
import { $api } from '@/shared/api/api'
import { PAGE_SIZE } from '@/shared/const/pagination'
import { debounce } from 'lodash'
import { ref, type Ref } from 'vue'
import { useQueryClient, type UseQueryOptions } from 'vue-query'

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

    const fetchData = async (): Promise<{
        count?: number
        persons?: ContactPerson[]
    }> => {
        try {
            const page = filters.value?.page || 1
            const take = filters.value?.take || 1
            const response = await $api.get('persons', {
                params: {
                    ...filters.value,
                    skip: (page - 1) * PAGE_SIZE,
                    take,
                    page: undefined,
                },
            })
            return response.data
        } catch (error) {
            console.error('Error fetching contact persons data:', error)
            throw error
        }
    }

    const queryOptions: UseQueryOptions<{
        count?: number
        persons?: ContactPerson[]
    }> = {
        keepPreviousData: true,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    }

    const setPageSize = async (pageSize: number) => {
        filters.value.take = pageSize
        await queryClient.invalidateQueries('persons')

        setTimeout(() => {
            queryClient.invalidateQueries('persons')
        }, 1000)
    }

    personFilterStore.$subscribe(
        debounce((_, state) => {
            Object.assign(filters.value, state)
            queryClient.invalidateQueries('persons')
        }, 500),
    )

    return {
        data,
        isLoading,
        setPageSize,
    }
}
