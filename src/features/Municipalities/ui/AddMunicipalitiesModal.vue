<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import { ErrorMessage, Form, useForm } from 'vee-validate'
import cls from './AddMunicipalitiesModal.module.scss'
import Modal from '@/shared/ui/Modal/Modal.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Input from '@/shared/ui/Input/Input.vue'
import Button from '@/shared/ui/Button/Button.vue'
import Note from '@/shared/ui/Note/Note.vue'
import { useMunicipalities } from '@/features/Municipalities/model/services/useMunicipalities'
import { addMunicipalityValidationSchema } from '@/features/Municipalities/model/lib/addMunicipalitiesSchema'

interface Props {
    isModalOpen: boolean
}

function setIsModalOpen(value: boolean) {
    emit('update:isModalOpen', value)
}

const { mutate, isLoading, error } = useMunicipalities(setIsModalOpen)

defineProps<Props>()
const emit = defineEmits(['update:isModalOpen'])

const onSubmit = (values: unknown) => {
    mutate(values)
}
</script>
<template>
    <div :class="cls.MunicipalitiesModal">
        <Modal
            :is-open="isModalOpen"
            title="Dodanie gminy"
            @update:isOpen="emit('update:isModalOpen', $event)"
        >
            <Form
                :validation-schema="addMunicipalityValidationSchema"
                @submit="onSubmit"
            >
                <Flex
                    gap="8"
                    direction="column"
                    align="start"
                    :class="cls.wrapper"
                >
                    <Note v-if="error"
                        >Nie udało nam się dodać gminy. Spróbuj ponownie
                        później.</Note
                    >
                    <Input
                        name="name"
                        label="Nazwa gminy"
                        placeholder="Nazwa gminy"
                    />
                    <Input
                        name="tractorRate"
                        label="Stawka ciągnika"
                        placeholder="xxx"
                        type="number"
                    />
                    <Input
                        name="trailerRate"
                        label="Stawka naczepy"
                        placeholder="xxxx"
                        type="number"
                    />
                    <Input
                        name="otherRate"
                        label="Inne"
                        placeholder="xxxx"
                        type="number"
                    />
                    <Input
                        name="year"
                        label="Rok stawek"
                        placeholder="xxxx"
                        type="number"
                    />
                    <Input
                        name="minTractorRate"
                        label="Min. stawka ciągnika"
                        placeholder="xxxx"
                        type="number"
                    />
                    <Input
                        name="minTrailerRate"
                        label="Min. stawka naczepy"
                        placeholder="xxxx"
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
