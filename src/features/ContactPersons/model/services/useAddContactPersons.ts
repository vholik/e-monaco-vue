import { $api } from '@/shared/api/api'
import { useMutation } from 'vue-query'
import { useToast } from 'vue-toastification'
import { usePersons } from './usePersons'

export const useAddContactPerson = (
    setIsModalOpen: (value: boolean) => void,
) => {
    const { refetch } = usePersons()

    const toast = useToast()
    return useMutation(
        ['add-contact-person'],
        async (data) => {
            const response = await $api.post('persons', data)
            return response.data
        },
        {
            onSuccess: () => {
                toast.success('Pomyślnie dodano osobę kontaktową')
                setIsModalOpen(false)
                refetch.value()
            },
        },
    )
}
