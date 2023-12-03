<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'
import { Form, useForm } from 'vee-validate'
import cls from './UpdateUserPassModal.module.scss'
import Modal from '@/shared/ui/Modal/Modal.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Input from '@/shared/ui/Input/Input.vue'
import Button from '@/shared/ui/Button/Button.vue'
import Note from '@/shared/ui/Note/Note.vue'
import { useUsers } from '../../model/services/useUsers'
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
            title="Zaktualizuj hasło"
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
                        name="pass"
                        label="Imię"
                        placeholder="Jan"
                    />
                </Flex>
                <div :class="cls.footer">
                    <Button
                        :class="cls.button"
                        :disabled="isLoading"
                    >
                    </Button>
                </div>
            </Form>
        </Modal>
    </div>
</template>
