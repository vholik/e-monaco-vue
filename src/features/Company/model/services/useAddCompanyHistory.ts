import { $api } from '@/shared/api/api'
import type { Ref } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'vue-toastification'

export const useAddCompanyHistory = (
    setIsModalOpen: (value: boolean) => void,
    companyId: Ref<string>,
    refetch: Ref<() => void>,
) => {
    const toast = useToast()
    const { invalidateQueries } = useQueryClient()
    return useMutation({
        mutationFn: async (data: Record<string, string>) => {
            const response = await $api.post(`contact-histories`, {
                ...data,
                companyId: companyId.value,
            })
            return response.data
        },
        onSuccess: () => {
            toast.success('Pomyślnie dodano firmę')
            invalidateQueries({ queryKey: ['contact-histories'] })
            setIsModalOpen(false)
        },
    })
}
