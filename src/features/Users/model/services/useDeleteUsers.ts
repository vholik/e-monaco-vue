import { useMutation, useQueryClient } from 'vue-query'
import { useToast } from 'vue-toastification'
import { $api } from '@/shared/api/api'

export const useDeleteUser = () => {
    const queryClient = useQueryClient()
    const toast = useToast()

    return useMutation(
        'delete-user',
        async (id: number) => {
            try {
                const response = await $api.delete(`users/${id}`)
                return response.data
            } catch (error) {
                console.error(
                    'Błąd podczas usuwania użytkownika:',
                    error.message,
                )
                throw error
            }
        },
        {
            onSuccess: () => {
                toast.success('Pomyślnie usunięto użytkownika')
                queryClient.invalidateQueries('users')
            },
        },
    )
}
