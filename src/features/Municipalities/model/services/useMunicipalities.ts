import { $api } from '@/shared/api/api'
import { useMutation } from 'vue-query'
import { useToast } from 'vue-toastification'
import { Ref } from 'vue'

export const useMunicipalities = (setIsModalOpen: (value: boolean) => void) => {
    const toast = useToast()

    return useMutation(
        'add-municipalities',
        async (data) => {
            try {
                const response = await $api.post('municipalities', data)
                return response.data
            } catch (error) {
                toast.error('Błąd podczas wysyłania żądania:', error.message)
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
