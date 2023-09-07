<script setup lang="ts">
import { useQueryProvider } from 'vue-query'

useQueryProvider()
</script>

<template>
  <router-view></router-view>
  <router-view name="dashboard"></router-view>
</template>

<style scoped></style>
