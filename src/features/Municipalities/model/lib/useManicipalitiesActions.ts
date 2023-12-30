import { debounce } from 'lodash'
import { useUpdateMunicipality } from '../services/useUpdateMunicipalities'

export function useMunicipalityActions() {
    const { mutate } = useUpdateMunicipality()

    const onDataChange = (id: string, key: string) => (value: unknown) => {
        mutate({ [key]: value, id })
    }
    return { onDataChange }
}
