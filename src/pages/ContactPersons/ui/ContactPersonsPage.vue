<script setup lang="ts">
import cls from './ContactPersonsPage.module.scss'
import { breadcrumbs } from '../model/consts/breadcrumbs'
</script>

<template>
    <div :class="cls.ContactPersons">
        <Breadcrumbs
            :items="breadcrumbs"
            class="breadcrumbs"
        />
        <h1>Hallo</h1>
    </div>
</template>
