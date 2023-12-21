import { useMunicipalityFilterStore } from '@/features/MunicipalitiesFilter'
import { $api } from '@/shared/api/api'
import { debounce } from 'lodash'
import { ref, type Ref } from 'vue'
import { useQuery, useQueryClient, type UseQueryOptions } from 'vue-query'
import type { Municipality } from '@/entities/Municipality'

interface MunicipalityData {
    count?: number
    municipalities?: Municipality[]
}

interface UseMunicipalityData {
    data: Ref<MunicipalityData | undefined>
    isLoading: Ref<boolean>
    setPageSize: (pageSize: number) => void
}

export const useMunicipalityData = (): UseMunicipalityData => {
    const municipalitiesFilterStore = useMunicipalityFilterStore()
    const filters = ref(municipalitiesFilterStore.$state)
    const data = ref<MunicipalityData | undefined>(undefined)
    const isLoading = ref(false)
    const queryClient = useQueryClient()

    const fetchData = async (): Promise<MunicipalityData> => {
        try {
            const page = filters.value?.page || 1
            const take = filters.value?.take || 1
            const response = await $api.get('municipalities', {
                params: {
                    ...filters.value,
                    skip: (page - 1) * take,
                    take,
                    page: undefined,
                },
            })
            return response.data
        } catch (error) {
            console.error('Error fetching data:', error)
            throw error
        }
    }

    const queryOptions: UseQueryOptions<MunicipalityData> = {
        keepPreviousData: true,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    }

    const query = useQuery<MunicipalityData>(
        ['municipalities', filters],
        fetchData,
        queryOptions,
    )

    const setPageSize = async (pageSize: number) => {
        filters.value.take = pageSize
        await queryClient.invalidateQueries('municipalities')

        setTimeout(() => {
            queryClient.invalidateQueries('municipalities')
        }, 1000)
    }

    municipalitiesFilterStore.$subscribe(
        debounce((_, state) => {
            Object.assign(filters.value, state)
            queryClient.invalidateQueries('municipalities')
        }, 500),
    )

    return {
        data,
        isLoading,
        setPageSize,
    }
}
