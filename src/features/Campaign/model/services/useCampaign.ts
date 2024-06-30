import { $api } from '@/shared/api/api'
import { useQuery } from 'vue-query'
import type { Campaign } from '@/entities/Campaign/model/types/campaign'

export const useCampaigns = () => {
    return useQuery(
        ['campaigns'],
        async () => {
            const response = await $api.get<Campaign[]>('campaigns')
            console.log('Fetched campaigns:', response.data)
            return response.data
        },
        {
            initialData: [],
            keepPreviousData: true,
            refetchOnWindowFocus: false,
        },
    )
}
