import { $api } from '@/shared/api/api'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'vue-toastification'

export const useAddContactPerson = (
    setIsModalOpen: (value: boolean) => void,
) => {
    const queryClient = useQueryClient()
    const toast = useToast()

    return useMutation({
        mutationFn: async (data) => {
            const response = await $api.post('persons', data)
            return response.data
        },
        onSuccess: () => {
            toast.success('Pomyślnie dodano osobę kontaktową')
            setIsModalOpen(false)
            queryClient.invalidateQueries({ queryKey: ['persons'] })
        },
    })
}
