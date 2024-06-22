import { $api } from '@/shared/api/api'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'vue-toastification'
import type { ContactHistory } from '@/entities/ContactHistory'

export const useUpdateContactHistory = (
    setIsModalOpen?: (value: boolean) => void,
) => {
    const queryClient = useQueryClient()
    const toast = useToast()
    return useMutation({
        mutationFn: async (data: Partial<ContactHistory>) => {
            const { id, ...body } = data
            const response = await $api.put(`contact-histories/${id}`, body)
            return response.data
        },
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['contact-histories'] })
            queryClient.refetchQueries({ queryKey: ['companies'] })
            setIsModalOpen?.(false)
        },
        onError: () => {
            toast.error('Wystąpił błąd. Spróbuj później')
        },
    })
}
