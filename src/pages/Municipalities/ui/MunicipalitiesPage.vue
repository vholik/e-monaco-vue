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
import MunicipalitesTable from '@/features/Municipalities/ui/MunicipalitiesTable.vue'
import MunicipalitiesFilter from '@/features/Municipalities/ui/MunicipalitiesFilter/MunicipalitiesFilter.vue'

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
            <Flex
                direction="column"
                align="start"
                gap="8"
            >
                <MunicipalitiesFilter />
                <MunicipalitesTable />
            </Flex>
        </Flex>
    </div>
</template>
