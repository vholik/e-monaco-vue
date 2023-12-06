<script setup lang="ts">
import cls from './PersonPagination.module.scss'
import Text from '@/shared/ui/Text/Text.vue'
import ArrowUp from '@/shared/assets/icons/ArrowUp.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import { computed, toRefs } from 'vue'
import { PAGE_SIZE } from '@/shared/const/pagination'
import { useContactPersonsFilterStore } from '@/features/PersonsFilter/model/store/personsFilterStore'
import { storeToRefs } from 'pinia'

interface Props {
    count: number
}
const props = defineProps<Props>()

const filterStore = useContactPersonsFilterStore()

const { count } = toRefs(props)

const { page } = storeToRefs(filterStore)

let pagesCount = computed(() => Math.ceil(count.value / PAGE_SIZE))
</script>

<template>
    <div
        v-if="count"
        :class="cls.PersonPagination"
    >
        <Flex gap="4">
            <Text
                color="quatinary"
                size="size_s"
            >
                Strona {{ page }} / {{ pagesCount }}</Text
            >
            <Flex gap="4">
                <Icon
                    :disabled="page === 1"
                    :color="page === 1 ? 'quinary' : 'quatinary'"
                    cursor-pointer
                    :icon="ArrowUp"
                    :class="cls.arrowLeft"
                    @click="filterStore.toPreviousPage"
                />
                <Icon
                    :disabled="page === pagesCount"
                    :color="page === pagesCount ? 'quinary' : 'quatinary'"
                    cursor-pointer
                    :icon="ArrowUp"
                    :class="cls.arrowRight"
                    @click="filterStore.toNextPage"
                />
            </Flex>
        </Flex>
    </div>
</template>
