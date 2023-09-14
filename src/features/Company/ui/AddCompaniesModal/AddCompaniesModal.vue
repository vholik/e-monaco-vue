<script setup lang="ts">
import cls from './AddCompaniesModal.module.scss'
import Modal from '@/shared/ui/Modal/Modal.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Input from '@/shared/ui/Input/Input.vue'
import { UserSelect } from '@/entities/User'
import { ContactPersonSelect } from '@/entities/ContactPerson'
import { StatusSelect } from '@/entities/Status'

interface Props {
    isModalOpen: boolean
}

defineProps<Props>()
const emit = defineEmits(['update:isModalOpen'])

function setIsModalOpen(value: boolean) {
    emit('update:isModalOpen', value)
}
</script>

<template>
    <div :class="cls.AddCompaniesModal">
        <Modal
            :isOpen="isModalOpen"
            title="Dodanie firmy"
            @update:isOpen="setIsModalOpen"
        >
            <Flex
                gap="8"
                direction="column"
                align="start"
            >
                <Input
                    name="name"
                    label="Następna data kontaktu"
                />
                <UserSelect
                    asInput
                    label="Owners"
                />
                <Input
                    name="comment"
                    label="Komentarz"
                />
                <Input
                    name="comment"
                    label="nip"
                />
                <Input
                    name="comment"
                    label="Imię"
                />
                <StatusSelect
                    label="Status"
                    asInput
                />
                <!-- TODO: add gmina select -->
                <Input
                    name="comment"
                    label="AKTYWACJA"
                />
                <Input
                    name="comment"
                    label="CZYNSZ"
                />
                <Input
                    name="comment"
                    label="DEKLARACJA"
                />
                <ContactPersonSelect
                    asInput
                    label="Contact persons"
                />
            </Flex>
        </Modal>
    </div>
</template>
