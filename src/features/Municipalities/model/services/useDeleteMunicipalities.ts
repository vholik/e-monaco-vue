import { $api } from '@/shared/api/api'
import { useMutation } from 'vue-query'
import { useToast } from 'vue-toastification'

export const useDeleteMunicipalities = () => {
    const toast = useToast()

    return useMutation(
        'delete-municipality',
        async (id: number) => {
            try {
                const response = await $api.delete(`municipalities/${id}`)
                return response.data
            } catch (error) {
                console.error('Błąd podczas usuwania gminy:', error.message)
                throw error
            }
        },
        {
            onSuccess: () => {
                toast.success('Pomyślnie usunięto gminę')
            },
        },
    )
}
