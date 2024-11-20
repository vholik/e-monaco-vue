<script setup lang="ts">
import cls from './AddCompaniesModal.module.scss'
import Modal from '@/shared/ui/Modal/Modal.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Input from '@/shared/ui/Input/Input.vue'
import { UserSelect, useUserStore } from '@/entities/User'
import { StatusSelect } from '@/entities/Status'
import { MunicipalitySelect } from '@/entities/Municipality'
import { Form } from 'vee-validate'
import { addCompanyValidationSchema } from '../../model/lib/addCompanySchema'
import Button from '@/shared/ui/Button/Button.vue'
import { useAddCompany } from '../../model/services/useAddCompany'
import Note from '@/shared/ui/Note/Note.vue'
import Datepicker from '@/shared/ui/Datepicker/Datepicker.vue'
import InputNipModal from '@/shared/ui/InputNipModal/InputNipModal.vue'
import { storeToRefs } from 'pinia'
import CampaignSelect from '@/features/Campaign/ui/CampaignSelect/CampaignSelect.vue'

interface Props {
    isModalOpen: boolean
}

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

function setIsModalOpen(value: boolean) {
    emit('update:isModalOpen', value)
}

const { mutate, isLoading, error } = useAddCompany(setIsModalOpen)

defineProps<Props>()
const emit = defineEmits(['update:isModalOpen'])

const onSubmit = async (values: any) => {
    console.log('Form values:', values)

    const { firstName, lastName, role, phone, email, campaigns, ...other } =
        values

    const campaignId = campaigns?.id || null
    const campaignTitle = campaigns?.title || null

    mutate({
        ...other,
        campaignId,
        campaignTitle,
        contactPersons: [
            { firstName, lastName, role, phone, email: email || undefined },
        ],
    })
}
</script>

<template>
    <div :class="cls.AddCompaniesModal">
        <Modal
            :is-open="isModalOpen"
            title="Dodanie firmy"
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
                    <Note v-if="error"
                        >Nie udało nam się dodać firmę. Spróbuj ponownie
                        później</Note
                    >
                    <Datepicker
                        name="nextContactDate"
                        label="Następna data kontaktu"
                        placeholder="15/09/2023"
                    />
                    <UserSelect
                        as-input
                        name="ownerId"
                        label="Owners"
                    />
                    <InputNipModal
                        name="nip"
                        label="nip"
                        placeholder="123-456-78-90"
                    />
                    <Input
                        name="name"
                        label="Nazwa firmy*"
                        placeholder="Firma XYZ Sp. z o.o."
                    />
                    <Input
                        name="comment"
                        label="Komentarz"
                        placeholder="Komentarz"
                    />
                    <Input
                        name="tractorAmount"
                        label="Ciągniki"
                        type="number"
                        placeholder="Wartość liczbowa całkowita"
                    />
                    <Input
                        name="trailerAmount"
                        label="Naczepy"
                        type="number"
                        placeholder="Wartość liczbowa całkowita"
                    />
                    <Input
                        name="otherAmount"
                        label="Inne"
                        type="number"
                        placeholder="Wartość liczbowa całkowita"
                    />
                    <StatusSelect
                        label="Status"
                        as-input
                        name="status"
                        showAllStatuses
                    />
                    <MunicipalitySelect
                        label="Gmina*"
                        as-input
                        name="municipalityId"
                    />
                    <Input
                        name="activation"
                        label="Aktywacja"
                        placeholder="Kwota w PLN"
                        type="number"
                    />
                    <Input
                        name="rentalFee"
                        label="Czynsz"
                        type="number"
                        placeholder="Kwota w PLN"
                    />
                    <Input
                        name="statement"
                        label="Deklaracja"
                        placeholder="Kwota w PLN"
                        type="number"
                    />
                    <Input
                        name="firstName"
                        label="Imię"
                        placeholder="Imię"
                        type="text"
                    />
                    <Input
                        name="lastName"
                        label="Nazwisko"
                        placeholder="Nazwisko"
                        type="text"
                    />
                    <Input
                        name="role"
                        label="Rola"
                        placeholder="Rola"
                        type="text"
                    />
                    <Input
                        name="email"
                        label="E-mail"
                        placeholder="adres@email.com"
                        type="email"
                    />
                    <Input
                        name="phone"
                        label="Telefon"
                        placeholder="Numer telefonu"
                        type="tel"
                    />
                    <CampaignSelect
                        name="campaigns"
                        label="Kampania"
                        as-input
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
