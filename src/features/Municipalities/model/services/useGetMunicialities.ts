import { $api } from '@/shared/api/api'
import { useQuery } from '@tanstack/vue-query'
import type { Municipality } from '@/entities/Municipality'
import type { Ref } from 'vue'

export const useGetMunicipality = (id: Ref<string>) => {
    return useQuery<Municipality | null>({
        queryKey: ['municipality', id],
        queryFn: async () => {
            if (!id.value) return null

            const response = await $api.get<Municipality>(
                `municipalities/${id.value}`,
            )
            return response.data
        },
        initialData: null,
    })
}
