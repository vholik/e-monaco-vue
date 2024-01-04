import { debounce } from 'lodash'
import { useUpdateContactHistory } from '../services/useUpdateHistory'

export function useContactHistoryActions() {
    const { mutate } = useUpdateContactHistory()

    const onDataChange = (id: string, key: string) =>
        debounce((value: unknown) => {
            mutate({ [key]: value, id })
        }, 500)

    return { onDataChange }
}
