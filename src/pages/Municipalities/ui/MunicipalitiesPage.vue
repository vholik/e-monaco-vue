<script setup lang="ts">
import cls from './Municipalities.module.scss'
import Breadcrumbs from '@/shared/ui/Breadcrumbs/Breadcrumbs.vue'
import { breadcrumbs } from '../model/consts/breadcrumbs'
import { ref } from 'vue'
</script>

<template>
    <div :class="cls.MunicipalitiesPage">
        <Breadcrumbs
            :items="breadcrumbs"
            class="breadcrumbs"
        />
    </div>
</template>
