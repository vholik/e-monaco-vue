import { $api } from '@/shared/api/api'
import { useMutation } from 'vue-query'
import { useToast } from 'vue-toastification'
import { useCompanies } from './useCompanies'

export const useAddCompany = (setIsModalOpen: (value: boolean) => void) => {
    const { refetch } = useCompanies()

    const toast = useToast()
    return useMutation(
        ['add-company'],
        async (data) => {
            const response = await $api.post('companies', data)
            return response.data
        },
        {
            onSuccess: () => {
                toast.success('Pomyślnie dodano firmę')
                setIsModalOpen(false)
                refetch.value()
            },
        },
    )
}
