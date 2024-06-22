import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'vue-toastification'
import { $api } from '@/shared/api/api'

export const useUsers = (setIsModalOpen: (value: boolean) => void) => {
    const queryClient = useQueryClient()
    const toast = useToast()

    return useMutation({
        mutationFn: async (data) => {
            try {
                const response = await $api.post('authentication/signup', data)
                return response.data
            } catch (error) {
                console.error('Błąd podczas wysyłania żądania:', error.message)
                throw error
            }
        },
        onSuccess: () => {
            toast.success('Pomyślnie dodano użytkownika')
            setIsModalOpen(false)
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })
}
