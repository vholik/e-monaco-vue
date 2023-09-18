<script setup lang="ts">
import type { UserRoles } from '@/entities/User'
import cls from './Avatar.module.scss'
import { computed, toRef, toRefs } from 'vue'

interface Props {
    name: string
    role?: UserRoles
}

const props = withDefaults(defineProps<Props>(), {
    role: 'admin',
})

const { name, role } = toRefs(props)

let currentName = computed(() =>
    name.value
        .split(' ')
        .map((word) => word[0])
        .join(''),
)
</script>

<template>
    <div :class="[cls.Avatar, cls[role]]">
        {{ currentName }}
    </div>
</template>
