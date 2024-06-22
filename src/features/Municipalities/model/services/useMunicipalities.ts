import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'vue-toastification'
import { $api } from '@/shared/api/api'

export const useMunicipalities = (
    setIsModalOpen?: (value: boolean) => void,
) => {
    const queryClient = useQueryClient()
    const toast = useToast()

    return useMutation({
        mutationFn: async (data) => {
            try {
                const response = await $api.post('municipalities', data)
                return response.data
            } catch (error) {
                toast.error('Błąd podczas wysyłania żądania:', error.message)
                throw error
            }
        },
        onSuccess: () => {
            toast.success('Pomyślnie dodano gminę')
            setIsModalOpen?.(false)
            queryClient.invalidateQueries({ queryKey: ['municipalities'] })
        },
    })
}
