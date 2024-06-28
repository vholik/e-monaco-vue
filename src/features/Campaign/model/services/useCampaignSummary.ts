import { ref, type Ref } from 'vue'
import { $api } from '@/shared/api/api'
import { useToast } from 'vue-toastification'
import type { CampaignSummary } from '@/entities/Campaign/model/types/campaignSummary'
import { useQuery } from 'vue-query'

export interface useCampaignSummary {
    data: Ref<CampaignSummary[] | null>
    isLoading: Ref<boolean>
    error: Ref<any>
}

export const useCampaignSummaries = (): useCampaignSummary => {
    const data = ref<CampaignSummary[] | null>(null)
    const isLoading = ref(false)
    const error = ref(null)
    const toast = useToast()

    const fetchAllCampaignSummaries = async () => {
        isLoading.value = true
        try {
            const campaignsResponse = await $api.get('/campaigns')
            const campaigns = campaignsResponse.data

            const mostRecentCampaign = campaigns.sort(
                (a: any, b: any) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
            )[0]

            if (!mostRecentCampaign) {
                toast.error('Nie znaleziono kampanii')
            }
            const response = await $api.get(
                `/companies/campaigns/${mostRecentCampaign.id}`,
            )
            const summaries = response.data.campaignSummary

            summaries.forEach((summary: CampaignSummary) => {
                summary.negatywni =
                    Number(summary.mala_oszczednosc ?? 0) +
                    Number(summary.brak_kontaktu ?? 0) +
                    Number(summary.dzialalnosc ?? 0) +
                    Number(summary.lokalny_patriota ?? 0) +
                    Number(summary.nie_target ?? 0) +
                    Number(summary.niezainteresowani ?? 0) +
                    Number(summary.tylko_leasing ?? 0)
            })

            data.value = summaries
        } catch (err) {
            error.value = err
            toast.error('Failed to fetch campaign summaries.')
        } finally {
            isLoading.value = false
        }
    }

    useQuery('allCampaignSummaries', fetchAllCampaignSummaries, {
        refetchOnWindowFocus: false,
    })

    return {
        data,
        isLoading,
        error,
    }
}
