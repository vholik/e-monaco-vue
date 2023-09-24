import { useCompanyFilterStore } from '@/features/CompanyFilter'
import { $api } from '@/shared/api/api'
import { PAGE_SIZE } from '@/shared/const/pagination'
import { debounce } from 'lodash'
import { ref } from 'vue'
import { useQuery } from 'vue-query'

export const useCompanies = () => {
    const companyFilterStore = useCompanyFilterStore()
    const filters = ref<typeof companyFilterStore.$state | null>(null)

    const query = useQuery(
        ['companies', filters],
        async () => {
            const page = filters.value?.page || 1
            const response = await $api.get('companies', {
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

    companyFilterStore.$subscribe(
        debounce((_, state) => {
            filters.value = state
        }, 500),
    )

    return query
}
