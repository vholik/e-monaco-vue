import { $api } from '@/shared/api/api'
import { useMutation } from '@tanstack/vue-query'
import { useToast } from 'vue-toastification'
import type { Municipality } from '@/entities/Municipality'
import { useMunicipality } from '@/features/Municipalities/model/services/useMunicipality'

export const useUpdateMunicipality = (refetchMunicipality?: any) => {
    const toast = useToast()
    const { refetch } = useMunicipality()

    return useMutation({
        mutationFn: async (data: Partial<Municipality>) => {
            const { id, ...body } = data
            const response = await $api.put(`municipalities/${id}`, body)
            return response.data
        },
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
            refetch.value()
            refetchMunicipality?.value?.()
        },
        onError: (error) => {
            toast.error('Wystąpił błąd. Spróbuj później')
        },
    })
}
