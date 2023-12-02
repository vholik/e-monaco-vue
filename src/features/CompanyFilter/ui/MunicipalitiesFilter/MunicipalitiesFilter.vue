<script setup lang="ts">
import { useCompanyFilterStore } from '../../model/store/companyFilterStore'
import { storeToRefs } from 'pinia'
import { debounce } from 'lodash'
import Flex from '@/shared/ui/Flex/Flex.vue'
import cls from './MunicipalitiesFilter.module.scss'
import { ref } from 'vue'
import Button from '@/shared/ui/Button/Button.vue'
import AddIcon from '@/shared/assets/icons/Add.vue'
import AddCompaniesModal from '@/features/Company/ui/AddCompaniesModal/AddCompaniesModal.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import Input from '@/shared/ui/Input/Input.vue'

const municipalitiesFilterStore = useCompanyFilterStore()
let modalOpen = ref(false)

const changeInputValue = debounce((value: string) => {
    municipalitiesFilterStore.setSearchTerm(value)
}, 500)

function openModal() {
    modalOpen.value = true
}
</script>

<template>
    <Flex
        gap="4"
        align="center"
        :class="cls.MunicipalitiesFilter"
    >
        <Button
            variant="secondary"
            :max="false"
            @click="openModal"
        >
            <Icon
                color="primary-variant"
                :icon="AddIcon"
            />
            Dodaj firmę
        </Button>
        <Input
            :with-search-icon="true"
            :class="cls.input"
            variant="secondary"
            name="companies-input"
            placeholder="Szukaj według słowa kluczowego..."
            @update:modelValue="changeInputValue"
        />
        <AddCompaniesModal v-model:isModalOpen="modalOpen" />
    </Flex>
</template>
