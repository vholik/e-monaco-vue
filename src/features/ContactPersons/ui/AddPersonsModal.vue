<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import { ErrorMessage, Form, useForm } from 'vee-validate'
import cls from './AddPersonsModal.module.scss'
import Modal from '@/shared/ui/Modal/Modal.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Input from '@/shared/ui/Input/Input.vue'
import Button from '@/shared/ui/Button/Button.vue'
import Note from '@/shared/ui/Note/Note.vue'
import { usePersons } from '@/features/ContactPersons/model/services/usePersons'
import { addPersonsModalValidationSchema } from '@/features/ContactPersons/model/lib/addContactPersonsSchema'
import Switch from '@/shared/ui/Switch/Switch.vue'
import ContactPersonCompanySelect from '@/entities/ContactPerson/ui/ContactPersonCompanySelect/ContactPersonCompanySelect.vue'
import { useCompanies } from '@/entities/Company/model/services/useCompanies'
interface Props {
    isModalOpen: boolean
}

function setIsModalOpen(value: boolean) {
    emit('update:isModalOpen', value)
}
const { data } = useCompanies()
const { mutate, isLoading, error } = usePersons(setIsModalOpen)

const modelValue = ref(false)

defineProps<Props>()

const emit = defineEmits(['update:isModalOpen'])

const onSubmit = (values: unknown) => {
    values.top = modelValue.value

    mutate(values)
}
</script>

<template>
    <div :class="cls.ContactPersonsModal">
        <Modal
            :is-open="isModalOpen"
            title="Dodanie osoby kontaktowej"
            @update:isOpen="emit('update:isModalOpen', $event)"
        >
            <Form
                :validation-schema="addPersonsModalValidationSchema"
                @submit="onSubmit"
            >
                <Flex
                    gap="8"
                    direction="column"
                    align="start"
                    :class="cls.wrapper"
                >
                    <Note v-if="error">
                        Nie udało nam się dodać osoby kontaktowej. Spróbuj
                        ponownie później.
                    </Note>
                    <Input
                        name="firstName"
                        label="Imię"
                        placeholder="Jan"
                    />
                    <Input
                        name="lastName"
                        label="Nazwisko"
                        placeholder="Kowalski"
                    />
                    <Input
                        name="role"
                        label="Rola"
                        placeholder="Stanowisko, rola, itp."
                    />
                    <Input
                        name="phone"
                        label="Telefon"
                        placeholder="123-456-789"
                    />
                    <Input
                        name="email"
                        label="E-mail"
                        placeholder="jan.kowalski@gmail.com"
                        autocomplete="off"
                    />
                    <ContactPersonCompanySelect
                        label="Nazwa Firmy"
                        as-input
                        name="companyId"
                        :companies="data?.company"
                    />
                    <Switch
                        name="top"
                        label="Top"
                        v-model="modelValue"
                    />
                </Flex>
                <div :class="cls.footer">
                    <Button
                        :class="cls.button"
                        :disabled="isLoading"
                    >
                        Dodaj
                    </Button>
                </div>
            </Form>
        </Modal>
    </div>
</template>
