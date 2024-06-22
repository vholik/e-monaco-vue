import { useCompanyFilterStore } from '@/features/CompanyFilter'
import { debounce } from 'lodash'
import { ref, type Ref } from 'vue'
import { useQueryClient, type UseQueryOptions } from '@tanstack/vue-query'
import type { Company } from '@/entities/Company'

interface CompaniesData {
    count?: number
    companies?: Company[]
}

interface UseCompaniesData {
    data: Ref<CompaniesData | undefined>
    isLoading: Ref<boolean>
    setPageSize: (pageSize: number) => void
}

export const useCompaniesData = (): UseCompaniesData => {
    const companyFilterStore = useCompanyFilterStore()
    const filters = ref(companyFilterStore.$state)
    const data = ref<CompaniesData | undefined>(undefined)
    const isLoading = ref(false)
    const queryClient = useQueryClient()

    const setPageSize = async (pageSize: number) => {
        filters.value.take = pageSize
        await queryClient.invalidateQueries({ queryKey: ['companies'] })

        setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['companies'] })
        }, 1000)
    }

    companyFilterStore.$subscribe(
        debounce((_, state) => {
            Object.assign(filters.value, state)
            queryClient.invalidateQueries({ queryKey: ['companies'] })
        }, 500),
    )

    return {
        data,
        isLoading,
        setPageSize,
    }
}
