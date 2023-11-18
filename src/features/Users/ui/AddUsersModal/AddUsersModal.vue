<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import { Form, useForm } from 'vee-validate'
import cls from './AddUsersModal.module.scss'
import Modal from '@/shared/ui/Modal/Modal.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Input from '@/shared/ui/Input/Input.vue'
import Button from '@/shared/ui/Button/Button.vue'
import Note from '@/shared/ui/Note/Note.vue'
import { useUsers } from '../../model/services/useUsers'
import UserRoleSelect from '@/entities/User/ui/UserRoleSelect/UserRoleSelect.vue'
import { addUsersModalValidationSchema } from '../../model/lib/addUsersSchema'

interface Props {
    isModalOpen: boolean
}

function setIsModalOpen(value: boolean) {
    emit('update:isModalOpen', value)
}

const { mutate, isLoading, error } = useUsers(setIsModalOpen)

defineProps<Props>()
const emit = defineEmits(['update:isModalOpen'])

const onSubmit = (values: unknown) => {
    mutate(values)
}
</script>

<template>
    <div :class="cls.UserRoleSelect">
        <Modal
            :is-open="isModalOpen"
            title="Dodanie użytkownika"
            @update:isOpen="emit('update:isModalOpen', $event)"
        >
            <Form
                :validation-schema="addUsersModalValidationSchema"
                @submit="onSubmit"
            >
                <Flex
                    gap="8"
                    direction="column"
                    align="start"
                    :class="cls.wrapper"
                >
                    <Note v-if="error">
                        Nie udało nam się dodać użytkownika. Spróbuj ponownie
                        później.
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
                        name="email"
                        label="E-mail"
                        placeholder="jan.kowalski@gmail.com"
                        autocomplete="off"
                    />
                    <Input
                        name="password"
                        label="Hasło"
                        type="password"
                        placeholder="********"
                        autocomplete="off"
                    />
                    <UserRoleSelect
                        name="role"
                        as-input
                        label="Rola"
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
