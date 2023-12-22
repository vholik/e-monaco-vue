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
import ContactPersonsFilter from '@/features/ContactPersons/ui/ContactPersonFilter/ContactPersonFilter.vue'
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
            <h1 :class="cls.title">Lista osób kontaktowych</h1>
            <Flex
                gap="16"
                direction="column"
                align="start"
            >
                <ContactPersonsFilter />
                <PersonsTable />
            </Flex>
        </Flex>
    </div>
</template>
