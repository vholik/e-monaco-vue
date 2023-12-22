<script setup lang="ts">
import cls from './MunicipalitiesPagination.module.scss'
import Text from '@/shared/ui/Text/Text.vue'
import ArrowUp from '@/shared/assets/icons/ArrowUp.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import { computed, toRefs, ref } from 'vue'
import { PAGE_SIZE } from '@/shared/const/pagination'
import { useMunicipalityFilterStore } from '@/features/MunicipalitiesFilter/model/store/municipalitiesFilterStore'
import { storeToRefs } from 'pinia'
import { useMunicipalityData } from '@/features/Municipalities/model/services/useMunicipalitiesData'
import { useToast } from 'vue-toastification'

interface Props {
    count: number
}

const toast = useToast()

const filterStore = useMunicipalityFilterStore()

const { setPageSize: handleSetPageSize } = useMunicipalityData()

const { page } = storeToRefs(filterStore)

const props = defineProps<Props>()

const { count } = toRefs(props)

const selectedPageSize = ref(PAGE_SIZE)

const pageSizeOptions = [10, 20, 50, 100]

const changePageSize = () => {
    handleSetPageSize(selectedPageSize.value)
}

let pagesCount = computed(() => Math.ceil(count.value / selectedPageSize.value))

const inputPage = ref(1)

const goToPage = () => {
    const pageNumber = parseInt(inputPage.value)
    if (pageNumber >= 1 && pageNumber <= pagesCount.value) {
        filterStore.page = pageNumber
    } else {
        toast.error('Nieprawidłowy numer strony')
    }
}
</script>

<template>
    <div
        v-if="count"
        :class="cls.MunicipalitiesPagination"
    >
        <Flex gap="4">
            <Text
                color="quatinary"
                size="size_s"
            >
                Strona {{ page }} / {{ pagesCount }}</Text
            >
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
                <label
                    for="pageNumber"
                    :class="cls.pageLabel"
                    >Wpisz numer strony:</label
                >
                <input
                    type="number"
                    v-model.number="inputPage"
                    @keyup.enter="goToPage"
                    min="1"
                    :max="pagesCount"
                />
            </Flex>
        </Flex>
    </div>
</template>
