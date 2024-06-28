<script setup lang="ts">
import cls from './AddCampaignModal.module.scss'
import Modal from '@/shared/ui/Modal/Modal.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Input from '@/shared/ui/Input/Input.vue'
import Button from '@/shared/ui/Button/Button.vue'
import Note from '@/shared/ui/Note/Note.vue'
import { Form } from 'vee-validate'
import { defineProps, defineEmits, ref } from 'vue'
import { useAddCampaign } from '../../model/services/useAddCampaign'

interface Props {
    isModalOpen: boolean
}
function setIsModalOpen(value: boolean) {
    emit('update:isModalOpen', value)
}

defineProps<Props>()
const emit = defineEmits(['update:isModalOpen'])
const { mutate, isLoading, error } = useAddCampaign(setIsModalOpen)

const onSubmit = (values: string) => {
    mutate(values)
}
</script>
<template>
    <div :class="cls.AddCampaignModal">
        <Modal
            :is-open="isModalOpen"
            title="Dodanie kampanii"
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
                        Nie udało nam się dodać kampanii. Spróbuj ponownie
                        później
                    </Note>
                    <Input
                        name="title"
                        label="Nazwa kampanii"
                        placeholder="Wprowadź nazwę kampanii"
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
