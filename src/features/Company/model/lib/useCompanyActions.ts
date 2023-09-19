import { useUpdateCompany } from '../services/useUpdateCompany'

export function useCompanyActions() {
    const { mutate } = useUpdateCompany()

    // TODO: add debounce
    const onDataChange = (id: string, key: string) => (value: unknown) => {
        mutate({ [key]: value, id })
    }

    return { onDataChange }
}
