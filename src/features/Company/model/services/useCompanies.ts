import type { Company } from '@/entities/Company'
import { useCompanyFilterStore } from '@/features/CompanyFilter'
import { $api } from '@/shared/api/api'
import { PAGE_SIZE } from '@/shared/const/pagination'
import { debounce } from 'lodash'
import { ref, type Ref } from 'vue'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'

export type CompaniesData = Ref<
    { count?: number; companies?: Company[] } | undefined
>

export const useCompanies = () => {
    const companyFilterStore = useCompanyFilterStore()
    const filters = ref<typeof companyFilterStore.$state | null>(
        companyFilterStore.$state ?? null,
    )

    const query = useQuery({
        queryKey: ['companies', filters],
        queryFn: async () => {
            const page = filters.value?.page || 1
            const response = await $api.get('companies', {
                params: {
                    ...filters.value,
                    skip: (page - 1) * (filters.value?.take || PAGE_SIZE),
                    page: undefined,
                },
            })

            return response.data
        },
        placeholderData: (previous) => previous,
    })

    companyFilterStore.$subscribe(
        debounce((_, state) => {
            filters.value = state
        }, 500),
    )

    return query
}
