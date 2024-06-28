import { $api } from '@/shared/api/api'
import { useMutation, useQueryClient } from 'vue-query'
import { useToast } from 'vue-toastification'

export const useAddCampaign = (setIsModalOpen: (value: boolean) => void) => {
    const toast = useToast()
    const queryClient = useQueryClient()
    return useMutation(
        'add-campaign',
        async (data) => {
            try {
                const response = await $api.post('campaigns', data)
                return response.data
            } catch (error) {
                console.error('Błąd podczas wysyłania żądania:', error.message)
                throw error
            }
        },
        {
            onSuccess: () => {
                toast.success('Pomyślnie dodano kampanię')
                setIsModalOpen(false)
                queryClient.invalidateQueries('campaigns')
            },
            onError: () => {
                toast.error(
                    'Nie udało się dodać kampanii. Spróbuj ponownie później',
                )
            },
        },
    )
}
