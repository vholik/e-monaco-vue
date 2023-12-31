import { AxiosError } from 'axios'
import { $api } from '@/shared/api/api'
import { useMutation, useQueryClient } from 'vue-query'
import { useToast } from 'vue-toastification'

export const usePersons = (setIsModalOpen?: (value: boolean) => void) => {
    const queryClient = useQueryClient()
    const toast = useToast()

    return useMutation(
        ['add-contact-persons'],
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
                }
                throw error
            }
        },
        {
            onSuccess: () => {
                console.log('Mutation success - onSuccess')
                toast.success('Pomyślnie dodano osoby kontaktowe')
                setIsModalOpen?.(false)
                queryClient.invalidateQueries('persons')
            },
        },
    )
}
