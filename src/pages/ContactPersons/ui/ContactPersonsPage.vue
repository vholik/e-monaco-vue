<script setup lang="ts">
import cls from './ContactPersonsPage.module.scss'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Breadcrumbs from '@/shared/ui/Breadcrumbs/Breadcrumbs.vue'
import { breadcrumbs } from '../model/consts/breadcrumbs'
import PersonsTable from '@/features/ContactPersons/ui/PersonsTable.vue'
</script>

<template>
    <div :class="cls.ContactPersonsPage">
        <Flex
            gap="32"
            direction="column"
            align="start"
        >
            <Breadcrumbs :items="breadcrumbs" />
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
