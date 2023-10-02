import { $api } from '@/shared/api/api'
import { useMutation } from 'vue-query'
import { useToast } from 'vue-toastification'
import { Ref } from 'vue'

export const useUsers = (setIsModalOpen: (value: boolean) => void) => {
    const toast = useToast()

    return useMutation(
        'add-user',
        async (data) => {
            try {
                const response = await $api.post('authentication/signup', data)
                return response.data
            } catch (error) {
                console.error('Błąd podczas wysyłania żądania:', error.message)
                throw error
            }
        },
        {
            onSuccess: () => {
                toast.success('Pomyślnie dodano użytkownika')
                setIsModalOpen(false)
            },
        },
    )
}
