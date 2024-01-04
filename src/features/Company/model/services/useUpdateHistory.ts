import { $api } from '@/shared/api/api'
import { useMutation } from 'vue-query'
import { useToast } from 'vue-toastification'
import type { ContactHistory } from '@/entities/ContactHistory'

export const useUpdateContactHistory = (
    setIsModalOpen?: (value: boolean) => void,
) => {
    const toast = useToast()
    return useMutation(
        ['update-contact-history'],
        async (data: Partial<ContactHistory>) => {
            const { id, ...body } = data
            const response = await $api.put(`contact-histories/${id}`, body)
            return response.data
        },
        {
            onSuccess: (_, data) => {
                let flag = false
                delete data.id
                Object.keys(data).forEach((name) => {
                    if (data[name as keyof ContactHistory]) {
                        flag = true
                    }
                })
                setIsModalOpen?.(false)

                if (flag) {
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
