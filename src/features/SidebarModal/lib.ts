import { $api } from '@/shared/api/api'
import { useMutation, useQuery } from 'vue-query'
import { useToast } from 'vue-toastification'
import * as yup from 'yup'

export const updateSettingsSchema = yup.object().shape({
    minTractorRate: yup.number().min(0).required().typeError('Wpisz liczbę'),
    minTrailerRate: yup.number().min(0).required().typeError('Wpisz liczbę'),
})

export const useUpdateSettings = (setIsModalOpen: (value: boolean) => void) => {
    const toast = useToast()
    const { refetch: refetchSettings } = useSettings()

    return useMutation(
        ['update-settings'],
        async (data) => {
            const response = await $api.put('settings', data)
            return response.data
        },
        {
            onSuccess: () => {
                toast.success('Pomyślnie aktualizowano ustawienia')
                setIsModalOpen(false)
                refetchSettings.value()
            },
        },
    )
}

export const useSettings = () => {
    return useQuery(['settings'], async (data) => {
        const response = await $api.get('settings', data)
        return response.data
    })
}
