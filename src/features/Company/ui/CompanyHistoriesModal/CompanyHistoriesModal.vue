<script setup lang="ts">
import cls from './CompanyHistoriesModal.module.scss'
import Modal from '@/shared/ui/Modal/Modal.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'

import { Form } from 'vee-validate'
import { addCompanyValidationSchema } from '../../model/lib/addCompanySchema'
import Button from '@/shared/ui/Button/Button.vue'
import { useAddCompany } from '../../model/services/useAddCompany'

import Tabs from '@/shared/ui/Tabs/Tabs.vue'
import { ref } from 'vue'
import { ContactHistoryFeed } from '@/entities/ContactHistory'
import { AddContactHistory } from '@/features/ContactHistory'

interface Props {
    isModalOpen: boolean
}

function setIsModalOpen(value: boolean) {
    emit('update:isModalOpen', value)
}

const { mutate, isLoading, isError } = useAddCompany(setIsModalOpen)

defineProps<Props>()
const emit = defineEmits(['update:isModalOpen'])

const onSubmit = (values: unknown) => {
    mutate(values)
}
const tabIndex = ref(0)
</script>

<template>
    <div :class="cls.AddCompaniesModal">
        <Modal
            :is-open="isModalOpen"
            title="Historia kontaktów"
            @update:isOpen="setIsModalOpen"
        >
            <Form
                :validation-schema="addCompanyValidationSchema"
                @submit="onSubmit"
            >
                <Flex
                    gap="8"
                    direction="column"
                    align="start"
                    :class="cls.wrapper"
                >
                    <Tabs
                        :tab-panels="[ContactHistoryFeed, AddContactHistory]"
                        :tab-options="['Wszystkie', 'Dodać historię']"
                    >
                        {{ tabIndex }}
                    </Tabs>
                </Flex>
                <div :class="cls.footer">
                    <Button
                        :class="cls.button"
                        variant="secondary"
                        :disabled="isLoading || isError"
                        >Anuluj</Button
                    >
                </div>
            </Form>
        </Modal>
    </div>
</template>
