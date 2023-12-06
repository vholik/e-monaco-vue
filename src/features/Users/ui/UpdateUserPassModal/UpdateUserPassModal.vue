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
import { useUpdateUsers } from '@/features/Users/model/services/useUpdateUsers'

interface Props {
    isModalOpen: boolean
}

function setIsModalOpen(value: boolean) {
    emit('update:isModalOpen', value)
}

const { mutate, isLoading, error } = useUsers(setIsModalOpen)

const showPassword = ref(false)

defineProps<Props>()

const emit = defineEmits(['update:isModalOpen'])

const onDataChange = useUpdateUsers()

const onSubmit = async (values: { password: string }) => {
    if (userId) {
        await onDataChange({ id: userId, password: values.password })
        mutate(values)
    }
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
                        name="password"
                        label="Nowe hasło"
                        placeholder="Wpisz nowe hasło"
                        :type="showPassword ? 'text' : 'password'"
                    />
                    <Flex>
                        <label
                            for="showPassword"
                            :class="cls.labelCheckbox"
                            >Pokaż hasło</label
                        >
                        <input
                            style="width: fit-contect"
                            type="checkbox"
                            v-model="showPassword"
                            id="showPassword"
                            :class="cls.checkbox"
                        />
                    </Flex>
                </Flex>
                <div :class="cls.footer">
                    <Button
                        :class="cls.button"
                        :disabled="isLoading"
                    >
                        Aktualizuj
                    </Button>
                </div>
            </Form>
        </Modal>
    </div>
</template>
