<script setup lang="ts">
import cls from './ContactPersonsPage.module.scss'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Breadcrumbs from '@/shared/ui/Breadcrumbs/Breadcrumbs.vue'
import { breadcrumbs } from '../model/consts/breadcrumbs'
import PersonsTable from '@/features/ContactPersons/ui/PersonsTable.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import AddPersonsModal from '@/features/ContactPersons/ui/AddPersonsModal.vue'
import { ref, onMounted } from 'vue'
import Button from '@/shared/ui/Button/Button.vue'
import AddIcon from '@/shared/assets/icons/Add.vue'

let modalOpen = ref(false)

function openModal() {
    modalOpen.value = true
}
</script>

<template>
    <div :class="cls.ContactPersons">
        <Flex
            gap="32"
            direction="column"
            align="start"
        >
            <Breadcrumbs :items="breadcrumbs" />
            <h1 :class="cls.title">Lista wszystkich osób kontaktowych</h1>
            <Button
                variant="secondary"
                :max="false"
                @click="openModal"
            >
                <Icon
                    color="primary-variant"
                    :icon="AddIcon"
                />
                Dodaj osobę kontaktową
            </Button>
            <AddPersonsModal v-model:isModalOpen="modalOpen"></AddPersonsModal>
            <Flex
                gap="16"
                direction="column"
                align="start"
            >
                <PersonsTable />
            </Flex>
        </Flex>
    </div>
</template>
