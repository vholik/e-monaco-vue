import { $api } from '@/shared/api/api'
import { useMutation, useQueryClient } from 'vue-query'
import { useToast } from 'vue-toastification'

export const useDeleteCompanies = () => {
    const queryClient = useQueryClient()
    const toast = useToast()

    return useMutation(
        async (id: String) => {
            try {
                const response = await $api.delete(`companies/${id}`)
                console.log('Delete response data:', response.data)
                console.log('Delete response status:', response.status)
                return response.data
            } catch (error) {
                console.error('Błąd podczas usuwania leada:', error.message)

                throw error
            }
        },
        {
            onSuccess: () => {
                toast.success('Pomyślnie usunięto leada')
                console.log('Delete onSuccess - Invalidate queries')
                queryClient.invalidateQueries('companies')
            },
        },
    )
}
