<script setup lang="ts">
import { defineProps, defineEmits, ref, type Ref, watch } from 'vue'
import { Form, useForm } from 'vee-validate'
import cls from './UpdateUserPassModal.module.scss'
import Modal from '@/shared/ui/Modal/Modal.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Input from '@/shared/ui/Input/Input.vue'
import Button from '@/shared/ui/Button/Button.vue'
import Note from '@/shared/ui/Note/Note.vue'
import { useUpdateUsers } from '@/features/Users/model/services/useUpdateUsers'

interface Props {
    isModalOpen: boolean
    userId: string
}

const { userId } = defineProps<Props>()
const userIdRef = ref(userId)
const modelValue = ref('')
const { mutate, isLoading, error } = useUpdateUsers()

const showPassword = ref(false)

const emit = defineEmits(['update:isModalOpen'])

watch(
    () => userId,
    (newValue) => {
        userIdRef.value = newValue
    },
)

const onSubmit = async () => {
    console.log('UserID in onSubmit:', userIdRef.value)
    try {
        if (userIdRef.value) {
            await mutate({ id: userIdRef.value, password: modelValue.value })
            console.log('Pomyślnie zaktualizowano hasło!')
        } else {
            console.error('Brak wybranego użytkownika')
        }
    } catch (error) {
        console.error('Błąd podczas aktualizacji hasła:', error)
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
                        name="password"
                        label="Nowe hasło"
                        placeholder="Wpisz nowe hasło"
                        :type="showPassword ? 'text' : 'password'"
                        v-model="modelValue"
                    />
                    <Flex>
                        <label
                            for="showPassword"
                            :class="cls.labelCheckbox"
                            >Pokaż hasło</label
                        >
                        <input
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
                        isModalOpen="false"
                    >
                        Aktualizuj
                    </Button>
                </div>
            </Form>
        </Modal>
    </div>
</template>
