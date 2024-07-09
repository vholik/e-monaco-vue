import { ref, Ref, watch } from 'vue'
import { $api } from '@/shared/api/api'
import { useQueryClient } from 'vue-query'
import { useToast } from 'vue-toastification'
import type { CampaignSummary } from '@/entities/Campaign/model/types/campaignSummary'

export interface CampaignSummaryData {
    count?: number
    campaigns?: CampaignSummary[]
}

export interface useCampaignSummary {
    data: Ref<CampaignSummaryData | undefined>
    isLoading: Ref<boolean>
    error: Ref<any>
    fetchCampaignSummaries: (id: string) => Promise<void>
}

export const useCampaignSummaries = (
    campaignId: Ref<string | null>,
): useCampaignSummary => {
    const data = ref<CampaignSummaryData | undefined>(undefined)
    const isLoading = ref(false)
    const error = ref<any>(null)
    const toast = useToast()
    const queryClient = useQueryClient()

    const fetchCampaignSummaries = async (id: string) => {
        isLoading.value = true
        try {
            const response = await $api.get(`/companies/campaigns/${id}`)
            const summaries = response.data.campaignSummary || []
            data.value = { campaigns: summaries }

            queryClient.invalidateQueries('campaigns')
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

    watch(campaignId, (newId) => {
        if (newId) fetchCampaignSummaries(newId)
    })

    return {
        data,
        isLoading,
        error,
        fetchCampaignSummaries,
    }
}
