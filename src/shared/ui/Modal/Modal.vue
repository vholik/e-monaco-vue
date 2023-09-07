<script setup lang="ts">
import cls from './Modal.module.scss'
import { ref, toRefs } from 'vue'
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription,
} from '@headlessui/vue'

interface Props {
    title: string
    description?: string
    isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['update:isOpen'])

const { isOpen } = toRefs(props)

function setIsOpen(value: boolean) {
    emit('update:isOpen', value)
}
</script>

<template>
    <Dialog
        :open="isOpen"
        @close="setIsOpen"
    >
        <div :class="cls.backdrop">
            <DialogPanel :class="cls.Modal">
                <DialogTitle :class="cls.title">{{ title }}</DialogTitle>
                <DialogDescription
                    :class="cls.description"
                    v-if="description"
                >
                    {{ description }}
                </DialogDescription>
                <div :class="cls.inner">
                    <slot></slot>
                </div>
            </DialogPanel>
            <DialogPanel> </DialogPanel>
        </div>
    </Dialog>
</template>
