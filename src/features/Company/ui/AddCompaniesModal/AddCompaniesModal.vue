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

interface Props {
    isModalOpen: boolean
}

defineProps<Props>()
const emit = defineEmits(['update:isModalOpen'])

function setIsModalOpen(value: boolean) {
    emit('update:isModalOpen', value)
}

const onSubmit = (values: unknown) => {
    console.log(values)
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
                    <Input
                        name="nextContactDate"
                        label="Następna data kontaktu"
                    />
                    <UserSelect
                        asInput
                        name="ownerId"
                        label="Owners"
                    />
                    <Input
                        name="comment"
                        label="Komentarz"
                    />
                    <Input
                        name="nip"
                        label="nip"
                    />
                    <Input
                        name="name"
                        label="Imię"
                    />
                    <Input
                        name="tractorAmount"
                        label="Tractor amount"
                    />
                    <Input
                        name="trailerAmount"
                        label="Trailer amount"
                    />
                    <Input
                        name="otherAmount"
                        label="Inne amount"
                    />
                    <StatusSelect
                        label="Status"
                        asInput
                        name="status"
                    />
                    <MunicipalitySelect
                        label="Gmina"
                        asInput
                        name="municipalityId"
                    />
                    <Input
                        name="activation"
                        label="AKTYWACJA"
                    />
                    <Input
                        name="rentalFee"
                        label="CZYNSZ"
                    />
                    <Input
                        name="declaration"
                        label="statement"
                    />
                    <ContactPersonSelect
                        asInput
                        label="Contact persons"
                        name="contactPersonsIds"
                    />
                </Flex>
                <div :class="cls.footer">
                    <Button :class="cls.button">Dodaj</Button>
                </div>
            </Form>
        </Modal>
    </div>
</template>
