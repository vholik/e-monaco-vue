<script setup lang="ts">
import cls from './CompaniesPagination.module.scss'
import Text from '@/shared/ui/Text/Text.vue'
import ArrowUp from '@/shared/assets/icons/ArrowUp.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import ColorSquares from '@/shared/ui/ColorSquares/ColorSquares.vue'
import { computed, toRefs, ref, onMounted } from 'vue'
import { PAGE_SIZE } from '@/shared/const/pagination'
import { useCompanyFilterStore } from '@/features/CompanyFilter'
import { storeToRefs } from 'pinia'
import { useCompaniesData } from '@/features/Company/model/services/useCompanyData'
import { useToast } from 'vue-toastification'

interface Props {
    count: number
}

const toast = useToast()

const filterStore = useCompanyFilterStore()

const { setPageSize: handleSetPageSize } = useCompaniesData()

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

onMounted(() => {
    const savedColor = localStorage.getItem('--primary-variant-bg-marked-color')
    if (savedColor) {
        document.documentElement.style.setProperty(
            '--primary-variant-bg-marked-color',
            savedColor,
        )
    }
})

const handleColorSelected = (color: string) => {
    document.documentElement.style.setProperty(
        '--primary-variant-bg-marked-color',
        color,
    )
    localStorage.setItem('--primary-variant-bg-marked-color', color)
}
</script>

<template>
    <div
        v-if="count"
        :class="cls.CompaniesPagination"
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
            <ColorSquares @colorSelected="handleColorSelected" />
        </Flex>

        <div class="tableWrapper">
            <table class="CompaniesTable">
                <tr
                    v-for="(row, index) in 10"
                    :key="index"
                    :class="{ marked: row.isMarked }"
                ></tr>
            </table>
        </div>
    </div>
</template>
