<script setup lang="ts">
import cls from './ContactPersonFilter.module.scss'
import Button from '@/shared/ui/Button/Button.vue'
import AddIcon from '@/shared/assets/icons/Add.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import Input from '@/shared/ui/Input/Input.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import { ref } from 'vue'
import { debounce } from 'lodash'
import { storeToRefs } from 'pinia'
import AddPersonsModal from '../AddPersonsModal.vue'
import { useContactPersonsFilterStore } from '@/features/PersonsFilter'

const companyFilterStore = useContactPersonsFilterStore()
let modalOpen = ref(false)

const changeInputValue = debounce((value: string) => {
    companyFilterStore.setSearchTerm(value)
}, 500)

function openModal() {
    modalOpen.value = true
}
</script>

<template>
    <Flex
        gap="4"
        align="center"
        :class="cls.ContactPersonFilter"
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
            Dodaj Kontakt
        </Button>
        <Input
            :with-search-icon="true"
            :class="cls.input"
            variant="secondary"
            name="companies-input"
            placeholder="Szukaj według słowa kluczowego..."
            @update:modelValue="changeInputValue"
        />
        <AddPersonsModal v-model:isModalOpen="modalOpen" />
    </Flex>
</template>
