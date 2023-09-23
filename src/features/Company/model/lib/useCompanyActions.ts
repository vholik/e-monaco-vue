import { debounce } from 'lodash'
import { useUpdateCompany } from '../services/useUpdateCompany'

export function useCompanyActions() {
    const { mutate } = useUpdateCompany()

    const onDataChange = (id: string, key: string) =>
        debounce((value: unknown) => {
            mutate({ [key]: value, id })
        }, 200)

    return { onDataChange }
}
