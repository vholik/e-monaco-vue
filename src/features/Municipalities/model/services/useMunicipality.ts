import type { Municipality } from '@/entities/Municipality'
import { useMunicipalityFilterStore } from '@/features/Municipalities/model/services/useMunicipalitiesFilters'
import { $api } from '@/shared/api/api'
import { PAGE_SIZE } from '@/shared/const/pagination'
import { debounce } from 'lodash'
import { ref, type Ref } from 'vue'
import { useQuery } from 'vue-query'

export type MunicipalitiesData = Ref<
    { count?: number; municipalities?: Municipality[] } | undefined
>

interface UseMunicipalitiesData {
    data: MunicipalitiesData
    isLoading: Ref<boolean>
}

export const useMunicipalities = (): UseMunicipalitiesData => {
    const municipalityFilterStore = useMunicipalityFilterStore()
    const filters = ref<typeof municipalityFilterStore.$state | null>(null)

    const query = useQuery(
        ['municipalities-filtered', filters],
        async () => {
            const page = filters.value?.page || 1
            const response = await $api.get('municipalities/filtered', {
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

    municipalityFilterStore.$subscribe(
        debounce((_, state) => {
            filters.value = state
        }, 500),
    )

    return query
}
