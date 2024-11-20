<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import cls from './ConfirmDeleteModal.module.scss'
import Modal from '@/shared/ui/Modal/Modal.vue'
import Button from '@/shared/ui/Button/Button.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'

interface Props {
    isOpen: boolean
    title?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:isOpen', 'confirmDelete'])

function closeModal() {
    emit('update:isOpen', false)
}

function confirmDelete() {
    emit('confirmDelete')
    closeModal()
}
</script>

<template>
    <Modal
        :isOpen="props.isOpen"
        :title="props.title || 'Potwierdzenie usunięcia'"
        @update:isOpen="closeModal"
    >
        <Flex
            gap="8"
            direction="column"
            align="start"
            :class="cls.wrapper"
        >
            <div :class="cls.body">
                <p>Czy na pewno chcesz usunąć danego leada?</p>
            </div>
        </Flex>
        <div :class="cls.footer">
            <Flex
                gap="8"
                direction="row"
                align="end"
                justify="end"
                :class="cls.wrapper"
            >
                <Button
                    @click="closeModal"
                    variant="secondary"
                >
                    Anuluj
                </Button>
                <Button
                    @click="confirmDelete"
                    variant="danger"
                >
                    Usuń
                </Button>
            </Flex>
        </div>
    </Modal>
</template>
