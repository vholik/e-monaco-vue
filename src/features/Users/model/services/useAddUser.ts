import { $api } from '@/shared/api/api'
import { useMutation } from 'vue-query'
import { useToast } from 'vue-toastification'

export const useAddUser = (setIsModalOpen: (value: boolean) => void) => {
    const toast = useToast()

    return useMutation(
        ['add-user'],
        async (data) => {
            const response = await $api.post('users', data)
            return response.data
        },
        {
            onSuccess: () => {
                toast.success('Pomyślnie dodano użytkownika')
                setIsModalOpen(false)
            },
        },
    )
}
