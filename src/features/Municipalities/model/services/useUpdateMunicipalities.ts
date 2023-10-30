import { $api } from '@/shared/api/api'
import { useMutation } from 'vue-query'
import { useToast } from 'vue-toastification'
import type { Municipality } from '@/entities/Municipality'

export const useUpdateMunicipality = () => {
    const toast = useToast()

    return useMutation(
        ['update-municipality'],
        async (data: Partial<Municipality>) => {
            const { id, ...body } = data
            const response = await $api.put(`municipalities/${id}`, body)
            return response.data
        },
        {
            onSuccess: (_, data) => {
                let flag = false
                delete data.id

                Object.keys(data).forEach((name) => {
                    if (data[name as keyof Municipality]) {
                        flag = true
                    }
                })

                if (flag) {
                    toast.success('Pomyślnie zaktualizowano gminę')
                } else {
                    toast.success('Pomyślnie usunięte dane')
                }
            },
            onError: () => {
                toast.error('Wystąpił błąd. Spróbuj później')
            },
        },
    )
}
