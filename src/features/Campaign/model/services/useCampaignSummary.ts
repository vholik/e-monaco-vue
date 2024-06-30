import { ref, type Ref } from 'vue'
import { $api } from '@/shared/api/api'
import { useToast } from 'vue-toastification'
import { useQuery } from 'vue-query'
import type { CampaignSummary } from '@/entities/Campaign/model/types/campaignSummary'

export interface CampaignSummaryData {
    count?: number
    campaigns?: CampaignSummary[]
}

export interface useCampaignSummary {
    data: Ref<CampaignSummaryData | undefined>
    isLoading: Ref<boolean>
    error: Ref<any>
}

export const useCampaignSummaries = (): useCampaignSummary => {
    const data = ref<CampaignSummaryData | undefined>(undefined)
    const isLoading = ref(false)
    const error = ref(null)
    const toast = useToast()

    const fetchAllCampaignSummaries = async () => {
        isLoading.value = true
        try {
            const response = await $api.get('/companies/campaign')
            const summaries = response.data.campaignSummary || []
            data.value = { campaigns: summaries }
        } catch (err: any) {
            if (err.response && err.response.status === 404) {
                data.value = { campaigns: [] }
            } else {
                error.value = err
                toast.error('Failed to fetch campaign summaries.')
            }
        } finally {
            isLoading.value = false
        }
    }

    useQuery('allCampaignSummaries', fetchAllCampaignSummaries, {
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    })

    return {
        data,
        isLoading,
        error,
    }
}
