<script setup lang="ts">
import cls from './CompanyHistoriesModal.module.scss'
import Modal from '@/shared/ui/Modal/Modal.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import { Form } from 'vee-validate'
import { addCompanyValidationSchema } from '../../model/lib/addCompanySchema'
import { h, toRefs, watch } from 'vue'
import Tabs from '@/shared/ui/Tabs/Tabs.vue'
import { ref } from 'vue'
import { ContactHistoryFeed } from '@/entities/ContactHistory'
import { AddContactHistory } from '@/features/ContactHistory'
import { useAddCompanyHistory } from '../../model/services/useAddCompanyHistory'

interface Props {
    isModalOpen: boolean
    currentCompanyId: string
    refetch: () => void
}

function setIsModalOpen(value: boolean) {
    emit('update:isModalOpen', value)
}

const props = defineProps<Props>()

const { currentCompanyId, refetch } = toRefs(props)

const { mutate, isLoading, isError } = useAddCompanyHistory(
    setIsModalOpen,
    currentCompanyId,
    refetch,
)

const emit = defineEmits(['update:isModalOpen'])

const onSubmit = (values: Record<string, string>) => {
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
                    direction="column"
                    align="start"
                    :class="cls.wrapper"
                >
                    <Tabs
                        :tab-panels="[
                            h(ContactHistoryFeed, {
                                companyId: currentCompanyId,
                            }),
                            h(AddContactHistory, {
                                onSubmit: onSubmit,
                                isLoading,
                                isError,
                            }),
                        ]"
                        :tab-options="['Wszystkie', 'Dodaj historię']"
                    >
                        {{ tabIndex }}
                    </Tabs>
                </Flex>
            </Form>
        </Modal>
    </div>
</template>
