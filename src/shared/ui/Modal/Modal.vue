<script setup lang="ts">
import cls from './Modal.module.scss'
import { toRefs } from 'vue'
import Button from '@/shared/ui/Button/Button.vue'
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
                <div :class="cls.header">
                    <DialogTitle :class="cls.title">{{ title }}</DialogTitle>
                    <DialogDescription
                        v-if="description"
                        :class="cls.description"
                    >
                        {{ description }}
                    </DialogDescription>
                </div>

                <div :class="cls.inner">
                    <slot></slot>
                </div>
            </DialogPanel>
            <DialogPanel> </DialogPanel>
        </div>
    </Dialog>
</template>
