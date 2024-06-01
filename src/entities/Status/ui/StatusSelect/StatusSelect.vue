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
        CompanyStatus.CALL_BACK,
        CompanyStatus.CONVERSATION,
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.CALL_BACK,
        CompanyStatus.OTHER,
        CompanyStatus.TO_BE_VERIFIED,
    ],
    [CompanyStatus.CALL_BACK]: [
        CompanyStatus.NOT_A_TARGET,
        CompanyStatus.LEASE_ONLY,
        CompanyStatus.LOCAL_PATRIOT,
        CompanyStatus.ACTIVITY,
        CompanyStatus.NOT_INTERESTED,
        CompanyStatus.SMALL_SAVINGS,
        CompanyStatus.CONVERSATION,
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.CALL_BACK,
        CompanyStatus.OTHER,
        CompanyStatus.CANNOT_BE_CALLED,
        CompanyStatus.DOESNT_EXIST,
    ],
    [CompanyStatus.DOESNT_EXIST]: [
        CompanyStatus.DOESNT_EXIST,
        CompanyStatus.CONVERSATION,
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
    ],
    [CompanyStatus.UNREACHABLE]: [
        CompanyStatus.CONVERSATION,
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.CALL_BACK,
        CompanyStatus.OTHER,
        CompanyStatus.UNREACHABLE,
    ],
    [CompanyStatus.CANNOT_BE_CALLED]: [
        CompanyStatus.LEASE_ONLY,
        CompanyStatus.NOT_A_TARGET,
        CompanyStatus.LOCAL_PATRIOT,
        CompanyStatus.ACTIVITY,
        CompanyStatus.NOT_INTERESTED,
        CompanyStatus.SMALL_SAVINGS,
        CompanyStatus.UNREACHABLE,
        CompanyStatus.CONVERSATION,
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.CANNOT_BE_CALLED,
    ],
    [CompanyStatus.CONVERSATION]: [
        CompanyStatus.LEASE_ONLY,
        CompanyStatus.NOT_A_TARGET,
        CompanyStatus.LOCAL_PATRIOT,
        CompanyStatus.ACTIVITY,
        CompanyStatus.NOT_INTERESTED,
        CompanyStatus.SMALL_SAVINGS,
        CompanyStatus.OFFER,
        CompanyStatus.OTHER,
        CompanyStatus.CONVERSATION,
        CompanyStatus.CALL_BACK,
        CompanyStatus.NEXT_CAMPAIGN,
    ],
    [CompanyStatus.OFFER]: [
        CompanyStatus.LEASE_ONLY,
        CompanyStatus.NOT_A_TARGET,
        CompanyStatus.LOCAL_PATRIOT,
        CompanyStatus.ACTIVITY,
        CompanyStatus.NOT_INTERESTED,
        CompanyStatus.SMALL_SAVINGS,
        CompanyStatus.AGREEMENT,
        CompanyStatus.CONVERSATION,
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.OFFER,
    ],
    [CompanyStatus.AGREEMENT]: [
        CompanyStatus.LEASE_ONLY,
        CompanyStatus.NOT_A_TARGET,
        CompanyStatus.LOCAL_PATRIOT,
        CompanyStatus.ACTIVITY,
        CompanyStatus.NOT_INTERESTED,
        CompanyStatus.SMALL_SAVINGS,
        CompanyStatus.DOCUMENTS,
        CompanyStatus.CONVERSATION,
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.AGREEMENT,
    ],
    [CompanyStatus.DOCUMENTS]: [
        CompanyStatus.LEASE_ONLY,
        CompanyStatus.NOT_A_TARGET,
        CompanyStatus.LOCAL_PATRIOT,
        CompanyStatus.ACTIVITY,
        CompanyStatus.NOT_INTERESTED,
        CompanyStatus.SMALL_SAVINGS,
        CompanyStatus.OUR_CLIENT,
        CompanyStatus.CONVERSATION,
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.DOCUMENTS,
    ],
    [CompanyStatus.OUR_CLIENT]: [
        CompanyStatus.LEASE_ONLY,
        CompanyStatus.NOT_A_TARGET,
        CompanyStatus.LOCAL_PATRIOT,
        CompanyStatus.ACTIVITY,
        CompanyStatus.NOT_INTERESTED,
        CompanyStatus.SMALL_SAVINGS,
        CompanyStatus.RESIGNED,
        CompanyStatus.CONVERSATION,
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.OUR_CLIENT,
    ],
    [CompanyStatus.RESIGNED]: [
        CompanyStatus.CONVERSATION,
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.RESIGNED,
    ],
    [CompanyStatus.LEASE_ONLY]: [
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.CONVERSATION,
        CompanyStatus.LEASE_ONLY,
    ],
    [CompanyStatus.NOT_A_TARGET]: [
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.CONVERSATION,
        CompanyStatus.NOT_A_TARGET,
    ],
    [CompanyStatus.LOCAL_PATRIOT]: [
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.CONVERSATION,
        CompanyStatus.LOCAL_PATRIOT,
    ],
    [CompanyStatus.ACTIVITY]: [
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.CONVERSATION,
        CompanyStatus.LOCAL_PATRIOT,
        CompanyStatus.ACTIVITY,
    ],
    [CompanyStatus.NOT_INTERESTED]: [
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.CONVERSATION,
        CompanyStatus.NOT_INTERESTED,
    ],
    [CompanyStatus.SMALL_SAVINGS]: [
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.CONVERSATION,
        CompanyStatus.SMALL_SAVINGS,
    ],
    [CompanyStatus.NEXT_CAMPAIGN]: [
        CompanyStatus.OTHER,
        CompanyStatus.CALL_BACK,
        CompanyStatus.CONVERSATION,
        CompanyStatus.NEXT_CAMPAIGN,
    ],
    [CompanyStatus.OTHER]: [
        CompanyStatus.TO_BE_VERIFIED,
        CompanyStatus.CALL_BACK,
        CompanyStatus.UNREACHABLE,
        CompanyStatus.LEASE_ONLY,
        CompanyStatus.NOT_A_TARGET,
        CompanyStatus.LOCAL_PATRIOT,
        CompanyStatus.ACTIVITY,
        CompanyStatus.NOT_INTERESTED,
        CompanyStatus.SMALL_SAVINGS,
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.CANNOT_BE_CALLED,
        CompanyStatus.OTHER,
        CompanyStatus.CONVERSATION,
        CompanyStatus.OFFER,
        CompanyStatus.AGREEMENT,
        CompanyStatus.DOCUMENTS,
        CompanyStatus.OUR_CLIENT,
        CompanyStatus.RESIGNED,
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
