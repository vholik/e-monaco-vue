<script setup lang="ts">
import cls from './CompaniesFilter.module.scss'
import Button from '@/shared/ui/Button/Button.vue'
import AddIcon from '@/shared/assets/icons/Add.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import Input from '@/shared/ui/Input/Input.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import AddCompaniesModalVue from '../AddCompaniesModal/AddCompaniesModal.vue'
import { ref } from 'vue'

interface Props {
    inputValue?: string | number
}

defineProps<Props>()

let modalOpen = ref(false)

const emit = defineEmits(['update:inputValue'])

function changeInputValue(value: string) {
    emit('update:inputValue', value)
}

function openModal() {
    modalOpen.value = true
}
</script>

<template>
    <Flex gap="4">
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
            :withSearchIcon="true"
            :class="cls.input"
            variant="secondary"
            name="companies-input"
            :modelValue="inputValue"
            @update:modelValue="changeInputValue"
            placeholder="Szukaj według słowa kluczowego..."
        />
        <AddCompaniesModalVue v-model:isModalOpen="modalOpen" />
    </Flex>
</template>
