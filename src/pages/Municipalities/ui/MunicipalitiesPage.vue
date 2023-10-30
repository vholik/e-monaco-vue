<script setup lang="ts">
import cls from './Municipalities.module.scss'
import Breadcrumbs from '@/shared/ui/Breadcrumbs/Breadcrumbs.vue'
import { breadcrumbs } from '../model/consts/breadcrumbs'
import AddMunicipalitiesModal from '@/features/Municipalities/ui/AddMunicipalitiesModal.vue'
import { ref } from 'vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import AddIcon from '@/shared/assets/icons/Add.vue'
import Button from '@/shared/ui/Button/Button.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'

let modalOpen = ref(false)

function openModal() {
    modalOpen.value = true
}
</script>

<template>
    <div :class="cls.MunicipalitiesPage">
        <Flex
            gap="32"
            direction="column"
            align="start"
        >
            <Breadcrumbs
                :items="breadcrumbs"
                class="breadcrumbs"
            />
            <h1 :class="cls.title">Lista gmin</h1>
            <Button
                variant="secondary"
                :max="false"
                @click="openModal"
            >
                <Icon
                    color="primary-variant"
                    :icon="AddIcon"
                />
                Dodaj gminę
            </Button>
            <AddMunicipalitiesModal
                v-model:isModalOpen="modalOpen"
            ></AddMunicipalitiesModal>
        </Flex>
    </div>
</template>
