import { $api } from '@/shared/api/api'
import { useMutation } from 'vue-query'
import { useToast } from 'vue-toastification'
import { Ref } from 'vue'

export const usePersons = (setIsModalOpen: (value: boolean) => void) => {
    const toast = useToast()

    return useMutation(
        'add-contact-persons',
        async (data) => {
            try {
                const response = await $api.post('/persons', data)
                return response.data
            } catch (error) {
                console.error('Błąd podczas wysyłania żądania:', error.message)
                throw error
            }
        },
        {
            onSuccess: () => {
                toast.success('Pomyślnie dodano osoby kontaktowe')
                setIsModalOpen(false)
            },
        },
    )
}
