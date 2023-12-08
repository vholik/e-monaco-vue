<script setup lang="ts">
import cls from './SidebarModal.module.scss'
import Modal from '@/shared/ui/Modal/Modal.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Input from '@/shared/ui/Input/Input.vue'
import { Form } from 'vee-validate'
import Button from '@/shared/ui/Button/Button.vue'
import Note from '@/shared/ui/Note/Note.vue'
import { useUpdateSettings, updateSettingsSchema, useSettings } from '../lib'

interface Props {
    isModalOpen: boolean
}

function setIsModalOpen(value: boolean) {
    emit('update:isModalOpen', value)
}

const { data } = useSettings()

const { mutate, isLoading, error } = useUpdateSettings(setIsModalOpen)

defineProps<Props>()
const emit = defineEmits(['update:isModalOpen'])

const onSubmit = (values: any) => {
    mutate(values)
}
</script>

<template>
    <div :class="cls.AddCompaniesModal">
        <Modal
            :is-open="isModalOpen"
            title="Ustawienia"
            @update:isOpen="setIsModalOpen"
        >
            <Form
                :initial-values="{
                    minTrailerRate: data?.minTrailerRate,
                    minTractorRate: data?.minTractorRate,
                }"
                :validation-schema="updateSettingsSchema"
                @submit="onSubmit"
            >
                <Flex
                    gap="8"
                    direction="column"
                    align="start"
                    :class="cls.wrapper"
                >
                    <Note v-if="error">
                        Nie udało nam się aktualizować dane. Spróbuj ponownie
                        później
                    </Note>
                    <Input
                        name="minTrailerRate"
                        label="Minimalna stawka za naczepę"
                        placeholder="Kwota w PLN"
                        type="number"
                    />
                    <Input
                        name="minTractorRate"
                        label="Minimalna stawka za ciągnik"
                        placeholder="Kwota w PLN"
                        type="number"
                    />
                </Flex>
                <div :class="cls.footer">
                    <Button
                        :class="cls.button"
                        :disabled="isLoading"
                        >Dodaj</Button
                    >
                </div>
            </Form>
        </Modal>
    </div>
</template>
