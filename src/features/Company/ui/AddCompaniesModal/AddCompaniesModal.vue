<script setup lang="ts">
import cls from './AddCompaniesModal.module.scss'
import Modal from '@/shared/ui/Modal/Modal.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Input from '@/shared/ui/Input/Input.vue'
import { UserSelect } from '@/entities/User'
import { ContactPersonSelect } from '@/entities/ContactPerson'
import { StatusSelect } from '@/entities/Status'
import { MunicipalitySelect } from '@/entities/Municipality'
import { Form } from 'vee-validate'
import { addCompanyValidationSchema } from '../../model/lib/addCompanySchema'
import Button from '@/shared/ui/Button/Button.vue'
import { useAddCompany } from '../../model/services/useAddCompany'
import Note from '@/shared/ui/Note/Note.vue'
import Datepicker from '@/shared/ui/Datepicker/Datepicker.vue'

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
</script>

<template>
    <div :class="cls.AddCompaniesModal">
        <Modal
            :isOpen="isModalOpen"
            title="Dodanie firmy"
            @update:isOpen="setIsModalOpen"
        >
            <Form
                @submit="onSubmit"
                :validation-schema="addCompanyValidationSchema"
            >
                <Flex
                    gap="8"
                    direction="column"
                    align="start"
                    :class="cls.wrapper"
                >
                    <Note v-if="isError">
                        Nie udało nam się dodać firmę. Spróbuj ponownie później
                    </Note>
                    <Datepicker
                        name="nextContactDate"
                        label="Następna data kontaktu"
                        placeholder="15/09/2023, 14:00"
                    />
                    <UserSelect
                        asInput
                        name="ownerId"
                        label="Owners"
                    />
                    <Input
                        name="comment"
                        label="Komentarz"
                        placeholder="Pole tekstowe do 500 znaków"
                    />
                    <Input
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
                        asInput
                        name="status"
                    />
                    <MunicipalitySelect
                        label="Gmina*"
                        asInput
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
                        name="declaration"
                        label="Deklaracja"
                        placeholder="Kwota w PLN"
                        type="number"
                    />
                    <ContactPersonSelect
                        asInput
                        label="Contact persons"
                        name="contactPersonsIds"
                    />
                </Flex>
                <div :class="cls.footer">
                    <Button
                        :class="cls.button"
                        :disabled="isLoading || isError"
                        >Dodaj</Button
                    >
                </div>
            </Form>
        </Modal>
    </div>
</template>
