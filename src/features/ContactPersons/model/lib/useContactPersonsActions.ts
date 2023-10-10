import { debounce } from 'lodash'
import { useUpdatePersons } from '../services/useUpdatePersons'

export function useContactPersonsActions() {
    const { mutate } = useUpdatePersons()

    const onDataChange = (id: string, key: string) =>
        debounce((value: unknown) => {
            mutate({ [key]: value, id })
        }, 500)

    return { onDataChange }
}
