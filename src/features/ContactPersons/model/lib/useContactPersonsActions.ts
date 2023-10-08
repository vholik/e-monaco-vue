// useContactPersonsActions.ts
import { debounce } from 'lodash'
import { usePersons } from '@/features/ContactPersons/model/services/usePersons'

export function useContactPersonActions() {
    const { mutate } = usePersons()

    const onDataChange = (id: string, key: string) =>
        debounce((value: unknown) => {
            mutate({ [key]: value, id })
        }, 500)

    return { onDataChange }
}
