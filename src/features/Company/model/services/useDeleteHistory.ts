import { $api } from '@/shared/api/api'
import { useMutation, useQueryClient } from 'vue-query'
import { useToast } from 'vue-toastification'

export const useDeleteHistory = () => {
    const queryClient = useQueryClient()
    const toast = useToast()

    return useMutation(
        'delete-contact-histories',
        async (id: number) => {
            try {
                const response = await $api.delete(`/contact-histories/${id}`)

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
                queryClient.invalidateQueries('contact-histories')
            },
        },
    )
}
