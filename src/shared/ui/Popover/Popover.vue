<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import cls from './Popover.module.scss'
</script>

<template>
    <Popover :class="cls.Popover">
        <PopoverButton :class="cls.button"><slot /></PopoverButton>
        <Transition name="fade">
            <PopoverPanel :class="cls.content">
                <slot name="content" /> </PopoverPanel
        ></Transition>
    </Popover>
</template>
