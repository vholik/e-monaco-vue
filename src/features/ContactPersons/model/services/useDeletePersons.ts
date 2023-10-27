import { $api } from '@/shared/api/api'
import { useMutation } from 'vue-query'
import { useToast } from 'vue-toastification'

export const useDeletePersons = () => {
    const toast = useToast()

    return useMutation(
        'delete-user',
        async (id: number) => {
            try {
                const response = await $api.delete(`persons/${id}`)
                return response.data
            } catch (error) {
                console.error('Błąd podczas wysyłania żądania:', error.message)
                throw error
            }
        },
        {
            onSuccess: () => {
                toast.success('Pomyślnie usunięto użytkownika')
            },
        },
    )
}
