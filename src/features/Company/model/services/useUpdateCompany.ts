import type { Company } from '@/entities/Company'
import { $api } from '@/shared/api/api'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'vue-toastification'
import { useCompanies } from './useCompanies'

export const useUpdateCompany = () => {
    const toast = useToast()
    const { invalidateQueries } = useQueryClient()

    return useMutation({
        mutationFn: async (data: Partial<Company>) => {
            const { id, ...body } = data
            const response = await $api.put(`companies/${id}`, body)
            return response.data
        },
        onSuccess: (_, data) => {
            let flag = false
            delete data.id

            Object.keys(data).forEach((name) => {
                if (data[name as keyof Company]) {
                    flag = true
                }
            })

            if (flag) {
                toast.success('Pomyślnie zaktualizowano firmę')
            } else {
                toast.success('Pomyślnie usunięte dane')
            }
        },
        onSettled: () => {
            invalidateQueries({ queryKey: ['companies'] })
        },
        onError: () => {
            toast.error('Wystąpił błąd. Spróbuj póżniej')
        },
    })
}
