<script setup lang="ts">
import { ref, computed } from 'vue'
import { debounce } from 'lodash'
import { CurrentFilter, useCompanyFilterStore } from '@/features/CompanyFilter'
import Button from '@/shared/ui/Button/Button.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import AddIcon from '@/shared/assets/icons/Add.vue'
import Input from '@/shared/ui/Input/Input.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import AddCompaniesModalVue from '../AddCompaniesModal/AddCompaniesModal.vue'
import EditCompanyModal from '@/features/EditCompanyModal/EditCompanyModal.vue'
import ImportDataModal from '@/features/Company/ui/ImportModal/ImportModal.vue'
import TableSelect from '../TableSelect/TableSelect.vue'
import { $api } from '@/shared/api/api'
import cls from './CompaniesFilter.module.scss'

const companyFilterStore = useCompanyFilterStore()
const modalOpen = ref(false)
const editModalOpen = ref(false)
const importModalOpen = ref(false)
const exportLoading = ref(false)

const props = defineProps<{
    selectionCount: number
    selectedCompanies: string[]
}>()

const isBulkEditVisible = computed(() => props.selectionCount > 0)

const changeInputValue = debounce((value: string) => {
    companyFilterStore.setSearchTerm(value)
}, 500)

function openEditModal() {
    editModalOpen.value = true
}

async function onExport() {
    const now = new Date().toISOString()
    exportLoading.value = true
    const el = document.createElement('a')

    try {
        const response = await $api.get('/companies/export', {
            responseType: 'blob',
            params: { ...companyFilterStore.$state },
        })
        const blobFile = await response.data
        el.href = window.URL.createObjectURL(blobFile)
        el.download = `export-leady-${now}.xlsx`
        el.click()
    } catch (error) {
        console.error('Error exporting companies:', error)
    } finally {
        exportLoading.value = false
    }
}

function handleBulkEdit() {
    openEditModal()
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
        <Button
            variant="secondary"
            :max="false"
            @click="importModalOpen = true"
        >
            Importuj
        </Button>
        <TableSelect />
        <Button
            variant="secondary"
            :max="false"
            @click="modalOpen = true"
        >
            <Icon
                color="primary-variant"
                :icon="AddIcon"
            />
            Dodaj firmę
        </Button>

        <Button
            v-if="isBulkEditVisible"
            variant="secondary"
            :max="false"
            @click="handleBulkEdit"
        >
            Edytuj
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

        <EditCompanyModal
            v-model:isModalOpen="editModalOpen"
            :selectedCompanyIds="props.selectedCompanies"
            @update-selected-companies="handleClearSelection"
        />

        <AddCompaniesModalVue v-model:isModalOpen="modalOpen" />
        <ImportDataModal v-model:isModalOpen="importModalOpen" />
    </Flex>
</template>
