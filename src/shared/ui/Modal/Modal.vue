<script setup lang="ts">
import cls from './Modal.module.scss'
import { toRefs, onMounted, onBeforeUnmount, ref } from 'vue'

interface Props {
    title: string
    description?: string
    isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['update:isOpen'])

const { isOpen } = toRefs(props)
const modalRef = ref()

function closeModal() {
    emit('update:isOpen', false)
}

onMounted(() => {
    window.addEventListener('keydown', handleEscapeKey)
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleEscapeKey)
})

function handleEscapeKey(event: KeyboardEvent) {
    if (event.key === 'Escape') {
        closeModal()
    }
}

function onClick(event: Event) {
    if (
        event.target !== modalRef.value &&
        !modalRef.value.contains(event.target as Node)
    ) {
        closeModal()
    }
}
</script>

<template>
    <Teleport to="body">
        <div v-if="isOpen">
            <div
                v-if="isOpen"
                :class="cls.backdrop"
            ></div>
            <div
                v-if="isOpen"
                :class="cls.container"
                @click="onClick"
            >
                <div
                    ref="modalRef"
                    :class="cls.Modal"
                >
                    <div :class="cls.header">
                        <h2
                            :class="cls.title"
                            autofocus
                        >
                            {{ title }}
                        </h2>
                        <p
                            v-if="description"
                            :class="cls.description"
                        >
                            {{ description }}
                        </p>
                    </div>

                    <div :class="cls.inner">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>
