<script setup lang="ts">
import Datepicker from '@/shared/ui/Datepicker/Datepicker.vue'
import cls from './AddContactHistory.module.scss'
import Input from '@/shared/ui/Input/Input.vue'
import { ContactHistorySelect } from '@/entities/ContactHistory'
import Flex from '@/shared/ui/Flex/Flex.vue'
import { addCompanyHistorySchema } from '../../model/lib/addContactHistorySchema'
import Button from '@/shared/ui/Button/Button.vue'
import { Form } from 'vee-validate'
import { toRefs } from 'vue'

interface Props {
    onSubmit: (values: Record<string, string>) => void
}

const props = defineProps<Props>()

const { onSubmit } = toRefs(props)

function submit(values: Record<string, string>) {
    onSubmit.value(values)
}
</script>

<template>
    <div :class="cls.AddContactHistory">
        <Form
            :validation-schema="addCompanyHistorySchema"
            @submit="submit"
        >
            <Flex
                gap="4"
                direction="column"
            >
                <Datepicker
                    name="contactDate"
                    label="Datowanie"
                    placeholder="15/09/2023, 14:00"
                />
                <ContactHistorySelect
                    name="result"
                    as-input
                    label="Rezultat"
                />
                <Input
                    name="comment"
                    placeholder="Komentarz"
                    label="Komentarz"
                />
            </Flex>
            <div :class="cls.footer">
                <Button
                    :class="cls.button"
                    variant="primary"
                    >Dodaj</Button
                >
            </div>
        </Form>
    </div>
</template>
