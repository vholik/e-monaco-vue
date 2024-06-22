import { $api } from '@/shared/api/api'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'vue-toastification'

export const useDeletePersons = () => {
    const queryClient = useQueryClient()
    const toast = useToast()

    return useMutation({
        mutationFn: async (id: number) => {
            try {
                const response = await $api.delete(`persons/${id}`)
                console.log('Delete response data:', response.data)
                console.log('Delete response status:', response.status)
                return response.data
            } catch (error) {
                console.error(
                    'Błąd podczas usuwania użytkownika:',
                    error.message,
                )
                throw error
            }
        },
        onSuccess: () => {
            toast.success('Pomyślnie usunięto użytkownika')
            console.log('Delete onSuccess - Invalidate queries')
            queryClient.invalidateQueries({ queryKey: ['persons'] })
        },
    })
}
