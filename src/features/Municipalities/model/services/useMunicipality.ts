import type { Municipality } from '@/entities/Municipality'
import { useMunicipalityFilterStore } from '@/features/MunicipalitiesFilter'
import { $api } from '@/shared/api/api'
import { PAGE_SIZE } from '@/shared/const/pagination'
import { debounce } from 'lodash'
import { ref, type Ref } from 'vue'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'

export type MunicipalityData = Ref<
    { count?: number; municipalities?: Municipality[] } | undefined
>

export const useMunicipality = () => {
    const municipalitiesFilterStore = useMunicipalityFilterStore()
    const filters = ref<typeof municipalitiesFilterStore.$state | null>(null)

    const query = useQuery({
        queryKey: ['municipalities', filters],
        queryFn: async () => {
            const page = filters.value?.page || 1
            const response = await $api.get('municipalities', {
                params: {
                    ...filters.value,
                    skip: (page - 1) * PAGE_SIZE,
                    page: undefined,
                },
            })

            return response.data
        },
        placeholderData: (previous) => previous,
    })

    municipalitiesFilterStore.$subscribe(
        debounce((_, state) => {
            filters.value = state
        }, 500),
    )

    return query
}
