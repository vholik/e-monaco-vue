<script setup lang="ts">
import cls from './CampaignPage.module.scss'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import Breadcrumbs from '@/shared/ui/Breadcrumbs/Breadcrumbs.vue'
import { breadcrumbs } from '../model/const/breadcrumbs'
import { ref, defineProps } from 'vue'
import AddCampaignModal from '@/features/Campaign/ui/AddCampaignModal/AddCampaignModal.vue'
import Button from '@/shared/ui/Button/Button.vue'
import AddIcon from '@/shared/assets/icons/Add.vue'
import CampaignTable from '@/features/Campaign/ui/CampaignTable/CampaignTable.vue'

interface Props {
    isModalOpen: boolean
}

defineProps<Props>()

const isModalOpen = ref(false)

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
            <h1 :class="cls.title">Podsumowanie kampanii</h1>
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
                <CampaignTable />
                <AddCampaignModal
                    :is-modal-open="isModalOpen"
                    @update:isModalOpen="setIsModalOpen"
                />
            </Flex>
        </Flex>
    </div>
</template>
