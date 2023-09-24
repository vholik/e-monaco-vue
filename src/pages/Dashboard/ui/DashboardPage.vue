<script setup lang="ts">
import cls from './DashboardPage.module.scss'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Breadcrumbs from '@/shared/ui/Breadcrumbs/Breadcrumbs.vue'
import { breadcrumbs } from '../model/consts/breadcrumbs'
import { CompaniesFilter, CompaniesTable } from '@/features/Company'
</script>

<template>
    <div :class="cls.DashboardPage">
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
                <CompaniesFilter />
                <CompaniesTable />
            </Flex>
        </Flex>
    </div>
</template>
