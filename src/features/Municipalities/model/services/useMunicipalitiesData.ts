import { useMunicipalityFilterStore } from '@/features/MunicipalitiesFilter'
import { $api } from '@/shared/api/api'
import { debounce } from 'lodash'
import { ref, type Ref } from 'vue'
import {
    useQuery,
    useQueryClient,
    type UseQueryOptions,
} from '@tanstack/vue-query'
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

    const setPageSize = async (pageSize: number) => {
        filters.value.take = pageSize
        await queryClient.invalidateQueries({ queryKey: ['municipalities'] })

        setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['municipalities'] })
        }, 1000)
    }

    municipalitiesFilterStore.$subscribe(
        debounce((_, state) => {
            Object.assign(filters.value, state)
            queryClient.invalidateQueries({ queryKey: ['municipalities'] })
        }, 500),
    )

    return {
        data,
        isLoading,
        setPageSize,
    }
}
