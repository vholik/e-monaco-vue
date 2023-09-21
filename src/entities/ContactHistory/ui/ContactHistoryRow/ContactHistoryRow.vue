<script setup lang="ts">
import Flex from '@/shared/ui/Flex/Flex.vue'
import cls from './ContactHistoryRow.module.scss'
import Text from '@/shared/ui/Text/Text.vue'
import { formatDateLikeFacebook } from '@/shared/lib/date'

interface Props {
    id: string
    contactDate: string
    contactResult: string
    comment: string
}

defineProps<Props>()
</script>

<template>
    <div :class="cls.ContactHistoryRow">
        <Flex
            direction="column"
            align="start"
            gap="6"
        >
            <Flex
                direction="column"
                align="start"
                gap="2"
            >
                <Flex gap="4">
                    <Text color="quatinary">Dodano historię: </Text>
                    <Text
                        color="primary"
                        weight="medium"
                        >{{ contactResult }}</Text
                    >
                </Flex>
                <Text
                    size="size_s"
                    color="quinary"
                >
                    {{ formatDateLikeFacebook(new Date(contactDate)) }}</Text
                >
            </Flex>

            <div
                v-if="comment"
                :class="cls.comment"
            >
                {{ comment }}
            </div>
        </Flex>
    </div>
</template>
