<script setup lang="ts">
import cls from './PersonPagination.module.scss'
import Text from '@/shared/ui/Text/Text.vue'
import ArrowUp from '@/shared/assets/icons/ArrowUp.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import { computed, toRefs, ref } from 'vue'
import { PAGE_SIZE } from '@/shared/const/pagination'
import { useContactPersonsFilterStore } from '@/features/PersonsFilter/model/store/personsFilterStore'
import { storeToRefs } from 'pinia'
import { usePersonsData } from '@/features/ContactPersons/model/services/usePersonData'

interface Props {
    count: number
}

const filterStore = useContactPersonsFilterStore()

const { setPageSize: handleSetPageSize } = usePersonsData()

const props = defineProps<Props>()

const { count } = toRefs(props)

const { page } = storeToRefs(filterStore)

const selectedPageSize = ref(PAGE_SIZE)

const pageSizeOptions = [10, 20, 50, 100]

const changePageSize = () => {
    handleSetPageSize(selectedPageSize.value)
}

let pagesCount = computed(() => Math.ceil(count.value / selectedPageSize.value))
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
                Strona {{ page }} / {{ pagesCount }}
            </Text>
            <select
                v-model="selectedPageSize"
                @change="changePageSize"
            >
                <option
                    v-for="option in pageSizeOptions"
                    :key="option"
                    :value="option"
                >
                    {{ option }}
                </option>
            </select>
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
