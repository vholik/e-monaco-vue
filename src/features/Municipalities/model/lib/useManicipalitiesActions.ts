import { debounce } from 'lodash'
import { useUpdateMunicipality } from '../services/useUpdateMunicipalities'

export function useMunicipalityActions() {
    const { mutate } = useUpdateMunicipality()

    const onDataChange = (id: string, key: string) =>
        debounce((value: unknown) => {
            mutate({ [key]: value, id })
        }, 500)

    return { onDataChange }
}
