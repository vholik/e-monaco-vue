import type { Municipality } from '@/entities/Municipality'
import { $api } from '@/shared/api/api'
import { debounce } from 'lodash'
import { ref, type Ref } from 'vue'
import { useQuery } from 'vue-query'

export type MunicipalitiesData = Ref<
    { municipalities?: Municipality[] } | undefined
>

interface UseMunicipalitiesData {
    data: MunicipalitiesData
    isLoading: Ref<boolean>
}

export const useMunicipality = (): UseMunicipalitiesData => {
    const query = useQuery(
        ['municipalities'],
        async () => {
            const response = await $api.get('municipalities')

            return response.data
        },
        { keepPreviousData: true },
    )
    return query
}
