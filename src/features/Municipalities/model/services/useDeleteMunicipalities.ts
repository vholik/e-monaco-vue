import { $api } from '@/shared/api/api'
import { useMutation } from '@tanstack/vue-query'
import { useToast } from 'vue-toastification'
import { useQueryClient } from '@tanstack/vue-query'

export const useDeleteMunicipalities = () => {
    const toast = useToast()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: number) => {
            try {
                const response = await $api.delete(`municipalities/${id}`)
                return response.data
            } catch (error) {
                console.error('Błąd podczas usuwania gminy:', error.message)
                throw error
            }
        },
        onSuccess: () => {
            toast.success('Pomyślnie usunięto gminę')
            queryClient.invalidateQueries({ queryKey: ['municipalities'] })
        },
    })
}
