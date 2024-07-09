<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import cls from './CampaignPage.module.scss'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import Breadcrumbs from '@/shared/ui/Breadcrumbs/Breadcrumbs.vue'
import AddCampaignModal from '@/features/Campaign/ui/AddCampaignModal/AddCampaignModal.vue'
import Button from '@/shared/ui/Button/Button.vue'
import AddIcon from '@/shared/assets/icons/Add.vue'
import CampaignTable from '@/features/Campaign/ui/CampaignTable/CampaignTable.vue'
import CampaignSelect from '@/features/Campaign/ui/CampaignSelect/CampaignSelect.vue'
import { useCampaignSummaries } from '@/features/Campaign/model/services/useCampaignSummary'
import { useCampaigns } from '@/features/Campaign/model/services/useCampaign'
import { breadcrumbs } from '../model/const/breadcrumbs'

const isModalOpen = ref(false)
const selectedCampaignId = ref<string | null>(null)

const { data: campaigns } = useCampaigns()
const { data, isLoading, error, fetchCampaignSummaries } =
    useCampaignSummaries(selectedCampaignId)

function openModal() {
    isModalOpen.value = true
}

function setIsModalOpen(value: boolean) {
    isModalOpen.value = value
}

const handleCampaignSelect = (id: string) => {
    selectedCampaignId.value = id
    fetchCampaignSummaries(id)
}

const selectedCampaignTitle = computed(() => {
    const campaign = campaigns.value.find(
        (campaign) => campaign.id === selectedCampaignId.value,
    )
    return campaign ? campaign.title : ''
})

onMounted(() => {
    if (!selectedCampaignId.value && campaigns.value.length > 0) {
        const latestCampaignId = campaigns.value[campaigns.value.length - 1].id
        selectedCampaignId.value = latestCampaignId
        fetchCampaignSummaries(latestCampaignId)
    }
})
</script>

<template>
    <div :class="cls.CampaignPage">
        <Flex
            gap="32"
            direction="column"
            align="start"
        >
            <Breadcrumbs :items="breadcrumbs" />
            <h1 :class="cls.title">
                Podsumowanie kampanii: {{ selectedCampaignTitle }}
            </h1>
            <Button
                variant="secondary"
                :max="false"
                @click="openModal"
            >
                <Icon
                    color="primary-variant"
                    :icon="AddIcon"
                />
                Dodaj kampanię
            </Button>
            <Flex
                direction="column"
                align="start"
                gap="8"
            >
                <CampaignSelect
                    name="campaignName"
                    @update="handleCampaignSelect"
                />
                <CampaignTable
                    v-if="data && data.campaigns"
                    key="campaign-table"
                    :campaignSummaries="data.campaigns"
                    :isLoading="isLoading"
                />
                <AddCampaignModal
                    :is-modal-open="isModalOpen"
                    @update:is-modal-open="setIsModalOpen"
                />
            </Flex>
        </Flex>
    </div>
</template>
