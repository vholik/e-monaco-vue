import type { User } from '@/entities/User'
import { $api } from '@/shared/api/api'
import { useMutation } from 'vue-query'
import { useToast } from 'vue-toastification'

export const useUpdateUsers = () => {
    const toast = useToast()
    return useMutation(
        ['update-user'],
        async (data: Partial<User>) => {
            const { id, ...body } = data
            const response = await $api.put(`user/${id}`, body)
            return response.data
        },
        {
            onSuccess: (_, data) => {
                let flag = false
                delete data.id
                Object.keys(data).forEach((name) => {
                    if (data[name as keyof User]) {
                        flag = true
                    }
                })

                if (flag) {
                    toast.success('Pomyślnie zaktualizowano użytkownika')
                } else {
                    toast.success('Pomyślnie usunięto dane')
                }
            },
            onError: () => {
                toast.error('Wystąpił błąd. Spróbuj później')
            },
        },
    )
}
