import { $api } from '@/shared/api/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'vue-toastification'
import * as yup from 'yup'

export const updateSettingsSchema = yup.object().shape({
    minTractorRate: yup.number().min(0).required().typeError('Wpisz liczbę'),
    minTrailerRate: yup.number().min(0).required().typeError('Wpisz liczbę'),
})

export const useUpdateSettings = (setIsModalOpen: (value: boolean) => void) => {
    const toast = useToast()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data) => {
            const response = await $api.put('settings', data)
            return response.data
        },
        onSuccess: () => {
            toast.success('Pomyślnie aktualizowano ustawienia')
            setIsModalOpen(false)
            queryClient.invalidateQueries({ queryKey: ['settings'] })
        },
    })
}

export const useSettings = () => {
    return useQuery({
        queryKey: ['settings'],
        queryFn: async (data) => {
            const response = await $api.get('settings', data)
            return response.data
        },
    })
}
