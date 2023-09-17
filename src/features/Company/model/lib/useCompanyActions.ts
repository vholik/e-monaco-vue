import { validateNip } from '@/shared/lib/nip'
import { useToast } from 'vue-toastification'
import { useUpdateCompany } from '../services/useUpdateCompany'

export function useCompanyActions() {
    const toast = useToast()
    const { mutate } = useUpdateCompany()

    const onDataChange = (id: string, key: string) => (value: unknown) => {
        mutate({ [key]: value, id })
    }

    return { onDataChange }
}
