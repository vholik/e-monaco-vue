import { $api } from '@/shared/api/api'
import { useMutation } from 'vue-query'
import { useToast } from 'vue-toastification'

export const useAddUser = (setIsModalOpen: (value: boolean) => void) => {
    // Jeśli chcesz, możesz również dodać funkcję refetch dla użytkowników, jeśli takie dane są ponownie pobierane po dodaniu użytkownika.

    const toast = useToast()

    return useMutation(
        ['add-user'],
        async (data) => {
            const response = await $api.post('users', data) // Przyjmuję, że endpoint to 'users'
            return response.data
        },
        {
            onSuccess: () => {
                toast.success('Pomyślnie dodano użytkownika')
                setIsModalOpen(false)
                // Dodaj tutaj funkcję refetch dla użytkowników, jeśli potrzebujesz
            },
        },
    )
}
