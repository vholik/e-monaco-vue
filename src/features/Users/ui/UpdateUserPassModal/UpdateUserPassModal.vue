<script setup lang="ts">
import { defineProps, defineEmits, ref, type Ref, watch } from 'vue'
import { Form } from 'vee-validate'
import cls from './UpdateUserPassModal.module.scss'
import Modal from '@/shared/ui/Modal/Modal.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Input from '@/shared/ui/Input/Input.vue'
import Button from '@/shared/ui/Button/Button.vue'
import Note from '@/shared/ui/Note/Note.vue'
import { useUpdateUsers } from '@/features/Users/model/services/useUpdateUsers'
import { toRefs } from 'vue'

interface Props {
    isModalOpen: boolean
    userId: string
}

const props = defineProps<Props>()
const { mutate, isLoading, error } = useUpdateUsers()
const { userId, isModalOpen } = toRefs(props)

const showPassword = ref(false)

const emit = defineEmits(['update:isModalOpen'])

const onSubmit = (value) => {
    emit('update:isModalOpen', false)
    mutate({ id: userId.value, password: value.password })
}
</script>

<template>
    <div :class="cls.UserRoleSelect">
        <Modal
            :is-open="isModalOpen"
            title="Zaktualizuj hasło"
            @update:isOpen="emit('update:isModalOpen', $event)"
        >
            <Form @submit="onSubmit">
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
                        v-model="modelValue"
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
                            id="showPassword"
                            v-model="showPassword"
                            type="checkbox"
                            :class="cls.checkbox"
                        />
                    </Flex>
                </Flex>
                <div :class="cls.footer">
                    <Button
                        :class="cls.button"
                        :disabled="isLoading"
                        is-modal-open="false"
                    >
                        Aktualizuj
                    </Button>
                </div>
            </Form>
        </Modal>
    </div>
</template>
