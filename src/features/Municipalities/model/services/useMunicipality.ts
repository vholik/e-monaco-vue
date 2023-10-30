import { $api } from '@/shared/api/api'
import { ref, type Ref } from 'vue'
import { useQuery } from 'vue-query'
import type { Municipality } from '@/entities/Municipality'

export type MunicipalitiesData = Ref<
    { municipalities?: Municipality[] } | undefined
>

interface UseMunicipalitiesData {
    data: MunicipalitiesData
    isLoading: Ref<boolean>
}

export const useMunicipalities = (): UseMunicipalitiesData => {
    const query = useQuery(
        'municipalities',
        async () => {
            const response = await $api.get('municipalities')

            return response.data
        },
        { keepPreviousData: true },
    )

    return query
}
