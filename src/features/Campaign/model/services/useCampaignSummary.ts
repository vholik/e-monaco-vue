import { $api } from '@/shared/api/api'
import { useQuery } from 'vue-query'

export const useCampaignSummary = (id: string) => {
    const { data, ...rest } = useQuery(
        ['campaigns', id],
        async () => {
            const response = await $api.get(`/companies/campaigns/${id}`)

            return response.data
        },
        {
            initialData: [],
        },
    )

    return { data, ...rest }
}
