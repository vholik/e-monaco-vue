import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'vue-toastification'
import type { ContactPerson } from '@/entities/ContactPerson'
import { $api } from '@/shared/api/api'

export const useUpdatePersons = () => {
    const queryClient = useQueryClient()
    const toast = useToast()

    return useMutation({
        mutationFn: async (data: Partial<ContactPerson>) => {
            const { id, ...body } = data
            const response = await $api.put(`persons/${id}`, body)
            return response.data
        },
        onSuccess: (_, data) => {
            let flag = false
            delete data.id

            Object.keys(data).forEach((name) => {
                if (data[name as keyof ContactPerson]) {
                    flag = true
                }
            })

            if (flag) {
                toast.success('Pomyślnie modyfikowano osobę')
            } else {
                toast.success('Pomyślnie usunięte dane')
            }

            queryClient.invalidateQueries({ queryKey: ['persons'] })
        },
        onError: () => {
            toast.error('Wystąpił błąd. Spróbuj później')
        },
    })
}
