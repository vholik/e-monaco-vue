import { $api } from '@/shared/api/api'
import { useMutation } from 'vue-query'
import { useToast } from 'vue-toastification'
import { useMunicipalities } from './useMunicipalities'

export const useAddMunicipalities = (
    setIsModalOpen: (value: boolean) => void,
) => {
    const { refetch } = useMunicipalities()

    const toast = useToast()
    return useMutation(
        ['add-municipalities'],
        async (data) => {
            const response = await $api.post('municipalities', data)
            return response.data
        },
        {
            onSuccess: () => {
                toast.success('Pomyślnie dodano gminę')
                setIsModalOpen(false)
                refetch()
            },
        },
    )
}
