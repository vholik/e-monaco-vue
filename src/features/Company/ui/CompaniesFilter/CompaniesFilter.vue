<script setup lang="ts">
import cls from './CompaniesFilter.module.scss'
import Button from '@/shared/ui/Button/Button.vue'
import AddIcon from '@/shared/assets/icons/Add.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import Input from '@/shared/ui/Input/Input.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import AddCompaniesModalVue from '../AddCompaniesModal/AddCompaniesModal.vue'
import { ref } from 'vue'
import { CurrentFilter, useCompanyFilterStore } from '@/features/CompanyFilter'
import { debounce } from 'lodash'
import TableSelect from '../TableSelect/TableSelect.vue'
import { $api } from '@/shared/api/api'

const companyFilterStore = useCompanyFilterStore()
let modalOpen = ref(false)
let exportLoading = ref(false)

const changeInputValue = debounce((value: string) => {
    companyFilterStore.setSearchTerm(value)
}, 500)

function openModal() {
    modalOpen.value = true
}

const companiesFilters = ref<typeof companyFilterStore.$state | null>(
    companyFilterStore.$state ?? null,
)

async function onExport() {
    const now = new Date().toISOString()
    exportLoading.value = true
    const el = document.createElement('a')
    const response = await $api.get('/companies/export', {
        responseType: 'blob',
        params: {
            ...companiesFilters.value,
        },
    })
    let blobFile = await response.data
    el.href = window.URL.createObjectURL(blobFile)
    el.download = `export-leady-${now}.xlsx`
    el.click()
    exportLoading.value = false
}
</script>

<template>
    <Flex
        gap="4"
        align="center"
        :class="cls.CompaniesFilter"
    >
        <Button
            @click="onExport"
            variant="secondary"
            :max="false"
        >
            {{ exportLoading ? 'Ładowanie...' : 'Eksportuj' }}
        </Button>
        <TableSelect />
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
        <CurrentFilter />
        <Input
            :with-search-icon="true"
            :class="cls.input"
            variant="secondary"
            name="companies-input"
            placeholder="Szukaj według słowa kluczowego..."
            @update:modelValue="changeInputValue"
        />

        <AddCompaniesModalVue v-model:isModalOpen="modalOpen" />
    </Flex>
</template>
