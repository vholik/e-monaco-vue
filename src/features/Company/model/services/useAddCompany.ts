import { $api } from '@/shared/api/api'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'vue-toastification'

export const useAddCompany = (setIsModalOpen: (value: boolean) => void) => {
    const { invalidateQueries } = useQueryClient()

    const toast = useToast()
    return useMutation({
        mutationFn: async (data) => {
            const response = await $api.post('companies', data)
            return response.data
        },
        onSuccess: () => {
            toast.success('Pomyślnie dodano firmę')
            setIsModalOpen(false)
            invalidateQueries({ queryKey: ['companies'] })
        },
    })
}
