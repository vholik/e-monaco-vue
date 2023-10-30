import { AxiosError } from 'axios'
import { $api } from '@/shared/api/api'
import { useMutation } from 'vue-query'
import { useToast } from 'vue-toastification'
import { Ref } from 'vue'

export const usePersons = (setIsModalOpen: (value: boolean) => void) => {
    const toast = useToast()

    return useMutation(
        'add-contact-persons',
        async (data) => {
            const requestData = { data, top: true }

            try {
                const response = await $api.post(
                    '/persons',
                    JSON.stringify(data),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                )
                return response.data
            } catch (error) {
                console.error('AxiosError:', error)
                if (error instanceof AxiosError && error.response) {
                    const axiosError = error as AxiosError
                    console.log('Response data:', axiosError.response.data)
                    console.log('Response status:', axiosError.response.status)
                    console.log(
                        'Response headers:',
                        axiosError.response.headers,
                    )
                }
            }
        },
        {
            onSuccess: () => {
                toast.success('Pomyślnie dodano osoby kontaktowe')
                setIsModalOpen(false)
            },
        },
    )
}
