<script setup lang="ts">
import cls from './CompanyHistoriesModal.module.scss'
import Modal from '@/shared/ui/Modal/Modal.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'

import { Form } from 'vee-validate'
import { addCompanyValidationSchema } from '../../model/lib/addCompanySchema'
import { useAddCompany } from '../../model/services/useAddCompany'
import { h } from 'vue'

import Tabs from '@/shared/ui/Tabs/Tabs.vue'
import { onMounted, ref } from 'vue'
import { ContactHistoryFeed } from '@/entities/ContactHistory'
import { AddContactHistory } from '@/features/ContactHistory'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

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

onMounted(() => {
    // console.log(route.query.id)
})
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
                            ContactHistoryFeed,
                            h(AddContactHistory, {
                                onSubmit: (value) => console.log(value),
                            }),
                        ]"
                        :tab-options="['Wszystkie', 'Dodać historię']"
                    >
                        {{ tabIndex }}
                    </Tabs>
                </Flex>
            </Form>
        </Modal>
    </div>
</template>
