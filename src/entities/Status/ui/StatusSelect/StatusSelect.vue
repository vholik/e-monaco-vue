<script setup lang="ts">
import Select from '@/shared/ui/Select/Select.vue'
import { useField } from 'vee-validate'
import { toRefs, watch, ref, defineProps, defineEmits, onMounted } from 'vue'
import { options } from '../../model/consts/status'
import { CompanyStatus } from '../..'
import type { SelectOption } from '@/shared/ui/Select/types'

interface Props {
    asInput?: boolean
    label?: string
    type?: string
    name: string
    defaultValue?: CompanyStatus
}

const props = defineProps<Props>()
const emit = defineEmits(['update'])

const { name, defaultValue } = toRefs(props)

const { errorMessage, value, handleChange } = useField(name, undefined, {
    initialValue: defaultValue?.value || options[0].id,
})

const statusFilters: Record<CompanyStatus, CompanyStatus[]> = {
    [CompanyStatus.TO_BE_VERIFIED]: [
        CompanyStatus.NOT_A_TARGET,
        CompanyStatus.CALL_BACK,
        CompanyStatus.ACTIVITY,
        CompanyStatus.SMALL_SAVINGS,
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.TO_BE_VERIFIED,
    ],
    [CompanyStatus.CALL_BACK]: [
        CompanyStatus.NOT_A_TARGET,
        CompanyStatus.LEASE_ONLY,
        CompanyStatus.NOT_INTERESTED,
        CompanyStatus.UNREACHABLE,
        CompanyStatus.ACTIVITY,
        CompanyStatus.LOCAL_PATRIOT,
        CompanyStatus.CONVERSATION,
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
    ],
    [CompanyStatus.UNREACHABLE]: [
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.UNREACHABLE,
    ],
    [CompanyStatus.CONVERSATION]: [
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.OFFER,
        CompanyStatus.CONVERSATION,
    ],
    [CompanyStatus.AGREEMENT]: [
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.DOCUMENTS,
        CompanyStatus.AGREEMENT,
    ],
    [CompanyStatus.DOCUMENTS]: [
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.NEW_CLIENT,
        CompanyStatus.DOCUMENTS,
    ],
    [CompanyStatus.NEW_CLIENT]: [
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.RESIGNED,
        CompanyStatus.OUR_CLIENT,
        CompanyStatus.NEW_CLIENT,
    ],
    [CompanyStatus.OUR_CLIENT]: [
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.RESIGNED,
        CompanyStatus.OUR_CLIENT,
    ],
    [CompanyStatus.NEXT_CAMPAIGN]: [
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.NEXT_CAMPAIGN,
    ],
    [CompanyStatus.LEASE_ONLY]: [
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.LEASE_ONLY,
    ],
    [CompanyStatus.NOT_A_TARGET]: [
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.NOT_A_TARGET,
    ],
    [CompanyStatus.NOT_INTERESTED]: [
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.NOT_INTERESTED,
    ],
    [CompanyStatus.ACTIVITY]: [
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.ACTIVITY,
    ],
    [CompanyStatus.RESIGNED]: [
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.RESIGNED,
    ],
    [CompanyStatus.OFFER]: [
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.AGREEMENT,
        CompanyStatus.OFFER,
    ],
    [CompanyStatus.OTHER]: [
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.CALL_BACK,
        CompanyStatus.OTHER,
    ],
    [CompanyStatus.LOCAL_PATRIOT]: [
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.LOCAL_PATRIOT,
    ],
    [CompanyStatus.CANNOT_BE_CALLED]: [
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.CANNOT_BE_CALLED,
    ],
    [CompanyStatus.SMALL_SAVINGS]: [
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.SMALL_SAVINGS,
    ],
}

const filteredOptions = ref<SelectOption[]>(options)

function filterOptions() {
    const selectedStatus = value.value

    if (Object.prototype.hasOwnProperty.call(statusFilters, selectedStatus)) {
        const allowedStatuses = new Set([
            ...statusFilters[selectedStatus],
            CompanyStatus.OTHER,
            CompanyStatus.CALL_BACK,
            CompanyStatus.NEXT_CAMPAIGN,
        ])
        filteredOptions.value = options.filter((option) =>
            allowedStatuses.has(option.id as CompanyStatus),
        )
    } else {
        filteredOptions.value = options
    }
}

function onUpdate(value: CompanyStatus) {
    emit('update', value)
    filterOptions()
}

onMounted(() => {
    filterOptions()
})

watch(value, filterOptions)
watch(defaultValue!, () => {
    handleChange(defaultValue?.value)
    filterOptions()
})
</script>

<template>
    <Select
        v-bind="$props"
        v-model="value"
        :options="filteredOptions"
        :error-message="errorMessage"
        @update:modelValue="onUpdate"
    />
</template>
