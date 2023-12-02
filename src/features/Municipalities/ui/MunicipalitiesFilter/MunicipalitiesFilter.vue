<script setup lang="ts">
import cls from './MunicipalitiesFilter.module.scss'
import Button from '@/shared/ui/Button/Button.vue'
import AddIcon from '@/shared/assets/icons/Add.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import Input from '@/shared/ui/Input/Input.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import { useMunicipalityFilterStore } from '@/features/MunicipalitiesFilter/model/store/municipalitiesFilterStore'
import { ref } from 'vue'
import { debounce } from 'lodash'

const municipalitiesFilterStore = useMunicipalityFilterStore()

const changeInputValue = debounce((value: string) => {
    municipalitiesFilterStore.setSearchTerm(value)
}, 500)
</script>

<template>
    <Flex
        gap="4"
        align="center"
        :class="cls.MunicipalitiesFilter"
    >
        <CurrentFilter />
        <Input
            :with-search-icon="true"
            :class="cls.input"
            variant="secondary"
            name="municipalities-input"
            placeholder="Szukaj według słowa kluczowego..."
            @update:modelValue="changeInputValue"
        />
    </Flex>
</template>
