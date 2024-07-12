<script setup lang="ts">
import { ref } from 'vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import Breadcrumbs from '@/shared/ui/Breadcrumbs/Breadcrumbs.vue'
import AddCampaignModal from '@/features/Campaign/ui/AddCampaignModal/AddCampaignModal.vue'
import Button from '@/shared/ui/Button/Button.vue'
import AddIcon from '@/shared/assets/icons/Add.vue'
import CampaignTable from '@/features/Campaign/ui/CampaignTable/CampaignTable.vue'
import { useCampaigns } from '@/features/Campaign/model/services/useCampaign'
import { breadcrumbs } from '../model/const/breadcrumbs'
import cls from './CampaignPage.module.scss'

const isModalOpen = ref(false)
const { data, isLoading } = useCampaigns()

function openModal() {
    isModalOpen.value = true
}

function setIsModalOpen(value: boolean) {
    isModalOpen.value = value
}
</script>

<template>
    <div :class="cls.CampaignPage">
        <Flex
            gap="32"
            direction="column"
            align="start"
        >
            <Breadcrumbs :items="breadcrumbs" />
            <h1 :class="cls.title">Kampanie</h1>
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
                v-if="data?.length"
                :class="cls.scollable"
            >
                <div class="scrollable-wrapper">
                    <CampaignTable
                        v-for="campaign in data"
                        :key="campaign.id"
                        :campaign="campaign"
                    />
                </div>
            </Flex>

            <AddCampaignModal
                :is-modal-open="isModalOpen"
                @update:is-modal-open="setIsModalOpen"
            />
        </Flex>
    </div>
</template>
