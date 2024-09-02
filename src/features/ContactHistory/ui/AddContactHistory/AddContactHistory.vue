<script setup lang="ts">
import Datepicker from '@/shared/ui/Datepicker/Datepicker.vue'
import cls from './AddContactHistory.module.scss'
import Input from '@/shared/ui/Input/Input.vue'
import { ContactHistorySelect } from '@/entities/ContactHistory'
import Flex from '@/shared/ui/Flex/Flex.vue'
import { addCompanyHistorySchema } from '../../model/lib/addContactHistorySchema'
import Button from '@/shared/ui/Button/Button.vue'
import { Form } from 'vee-validate'
import { ref, watch } from 'vue'
import Note from '@/shared/ui/Note/Note.vue'

interface Props {
    onSubmit: (values: Record<string, string>) => void
    isLoading: boolean
    error?: boolean
}

const props = defineProps<Props>()

const todayDate = ref(new Date().toISOString().split('T')[0])

const selectedDate = ref<string | null>(null)

const comment = ref('')

function submit(values: Record<string, string>) {
    props.onSubmit(values)
}
</script>

<template>
    <div :class="cls.AddContactHistory">
        <Form
            :validation-schema="addCompanyHistorySchema"
            @submit="submit"
        >
            <Flex
                gap="8"
                direction="column"
            >
                <Note v-if="error">
                    Wystąpił błąd. Spróbuj ponownie później
                </Note>
                <Datepicker
                    name="contactDate"
                    label="Datowanie"
                    :default-value="todayDate"
                    placeholder="Wybierz datę"
                />
                <!-- <ContactHistorySelect
                    name="contactResult"
                    as-input
                    label="Rezultat"
                /> -->
                <Input
                    name="comment"
                    placeholder="Komentarz"
                    label="Komentarz"
                    v-model="comment"
                />
            </Flex>
            <div :class="cls.footer">
                <Button
                    :class="cls.button"
                    variant="primary"
                    :disabled="isLoading || error"
                >
                    Dodaj
                </Button>
            </div>
        </Form>
    </div>
</template>
