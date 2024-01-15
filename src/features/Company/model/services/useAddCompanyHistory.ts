import { $api } from '@/shared/api/api'
import type { Ref } from 'vue'
import { useMutation } from 'vue-query'
import { useToast } from 'vue-toastification'

export const useAddCompanyHistory = (
    setIsModalOpen: (value: boolean) => void,
    companyId: Ref<string>,
    refetch: Ref<() => void>,
) => {
    const toast = useToast()
    return useMutation(
        ['add-history', companyId],
        async (data: Record<string, string>) => {
            const response = await $api.post(`contact-histories`, {
                ...data,
                companyId: companyId.value,
            })
            return response.data
        },
        {
            onSuccess: () => {
                toast.success('Pomyślnie dodano firmę')
                refetch.value()
                setIsModalOpen(false)
            },
        },
    )
}
