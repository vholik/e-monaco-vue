<script setup lang="ts">
import { ref, defineProps, defineEmits, nextTick } from 'vue'
import { useUpdateCompany } from '../../features/Company/model/services/useUpdateCompany'
import { type Company } from '@/entities/Company/model/types/company'
import cls from './EditCompanyModal.module.scss'
import Modal from '@/shared/ui/Modal/Modal.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import { UserSelect, useUserStore } from '@/entities/User'
import { StatusSelect } from '@/entities/Status'
import { MunicipalitySelect } from '@/entities/Municipality'
import { Form } from 'vee-validate'
import Button from '@/shared/ui/Button/Button.vue'
import CampaignSelect from '@/features/Campaign/ui/CampaignSelect/CampaignSelect.vue'
import Datepicker from '@/shared/ui/Datepicker/Datepicker.vue'
import { storeToRefs } from 'pinia'

const props = defineProps<{
    isModalOpen: boolean
    selectedCompanyIds?: string[]
}>()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { mutate } = useUpdateCompany()

const isDataLoaded = ref(false)

const emit = defineEmits([
    'update-selection-count',
    'update-selected-companies',
    'update:isModalOpen',
])

const formValues = ref<Partial<Company>>({
    nextContactDate: '',
    ownerId: null,
    status: null,
    municipalityId: null,
    campaignId: null,
})

const resetFormValues = () => {
    formValues.value = {
        nextContactDate: '',
        ownerId: null,
        status: null,
        municipalityId: null,
        campaignId: null,
    }
}

const fetchCompanyDetails = async (companyId: string) => {
    try {
        return await mutate({ id: companyId })
    } catch {
        return {}
    }
}

const setIsModalOpen = async (value: boolean) => {
    if (!value) {
        resetFormValues()
        isDataLoaded.value = false
    } else {
        const selectedCompanyId = props.selectedCompanyIds[0]
        if (!isDataLoaded.value && selectedCompanyId) {
            const companyDetails = await fetchCompanyDetails(selectedCompanyId)
            formValues.value = {
                nextContactDate: companyDetails.nextContactDate
                    ? new Date(companyDetails.nextContactDate)
                          .toISOString()
                          .split('T')[0]
                    : null,
                ownerId: companyDetails.owner?.id || null,
                status: companyDetails.status || null,
                municipalityId: companyDetails.municipality?.id || null,
                campaignId: companyDetails.campaign?.id || null,
            }
            isDataLoaded.value = true
        }
    }
    emit('update:isModalOpen', value)
}

const handleInputChange = (key: keyof Company) => {
    return (value: any) => {
        formValues.value[key] =
            key === 'nextContactDate'
                ? new Date(value).toISOString().split('T')[0]
                : value
    }
}

const clearSelection = () => {
    emit('update-selected-companies', [])
    emit('update-selection-count', 0)
}

const onSubmit = async () => {
    await nextTick()

    const companiesUpdates = props.selectedCompanyIds
        .map((id) => {
            const updatePayload: Partial<Company> = { id }
            if (formValues.value.nextContactDate) {
                updatePayload.nextContactDate = formValues.value.nextContactDate
            }
            if (formValues.value.ownerId) {
                updatePayload.ownerId = formValues.value.ownerId
            }
            if (formValues.value.status) {
                updatePayload.status = formValues.value.status
            }
            if (formValues.value.municipalityId) {
                updatePayload.municipalityId = formValues.value.municipalityId
            }
            if (formValues.value.campaignId) {
                updatePayload.campaignId = formValues.value.campaignId
            }
            return updatePayload
        })
        .filter((update) => Object.keys(update).length > 1)

    try {
        for (const update of companiesUpdates) {
            await mutate(update)
        }

        clearSelection()
    } catch (error) {
        if (error.response) {
            console.error('Error details:', error.response.data)
        }
    }
}
</script>

<template>
    <div :class="cls.EditCompanyModal">
        <Modal
            :is-open="props.isModalOpen"
            title="Edycja Firm"
            @update:isOpen="setIsModalOpen"
        >
            <Form @submit="onSubmit">
                <Flex
                    gap="8"
                    direction="column"
                    align="start"
                    :class="cls.wrapper"
                >
                    <Datepicker
                        name="nextContactDate"
                        label="Następna data kontaktu"
                        placeholder="15/09/2023"
                        v-model="formValues.nextContactDate"
                        @update:modelValue="
                            handleInputChange('nextContactDate')
                        "
                    />
                    <UserSelect
                        v-if="user?.role !== 'user'"
                        v-model="formValues.ownerId"
                        as-input
                        name="ownerId"
                        label="Właściciel"
                        @update:modelValue="handleInputChange('ownerId')"
                    />
                    <StatusSelect
                        v-model="formValues.status"
                        label="Status"
                        showAllStatuses
                        as-input
                        name="status"
                        @update:modelValue="handleInputChange('status')"
                    />
                    <MunicipalitySelect
                        v-model="formValues.municipalityId"
                        label="Gmina"
                        as-input
                        name="municipalityId"
                        @update:modelValue="handleInputChange('municipalityId')"
                    />
                    <CampaignSelect
                        v-model="formValues.campaignId"
                        name="campaignId"
                        label="Kampania"
                        as-input
                        @update:modelValue="handleInputChange('campaignId')"
                    />
                </Flex>
                <div :class="cls.footer">
                    <Button
                        type="submit"
                        :disabled="false"
                        >Zaktualizuj</Button
                    >
                </div>
            </Form>
        </Modal>
    </div>
</template>
