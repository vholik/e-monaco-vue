<script setup lang="ts">
import Select from '@/shared/ui/Select/Select.vue'
import { useField } from 'vee-validate'
import { toRefs, watch, ref, defineProps, defineEmits } from 'vue'
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
        CompanyStatus.TO_BE_VERIFIED,
        CompanyStatus.CHEAP_MUNICIPALITY,
        CompanyStatus.LEASE_ONLY,
        CompanyStatus.UNREACHABLE,
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.CONVERSATION,
        CompanyStatus.OFFER,
        CompanyStatus.AGREEMENT,
        CompanyStatus.SIGNED_AGREEMENT_AND_LEFT,
        CompanyStatus.PARTNER,
        CompanyStatus.OUR_MUNICIPALITY,
    ],
    [CompanyStatus.CALL_BACK]: [
        CompanyStatus.DOCUMENTS,
        CompanyStatus.DECLARATION,
        CompanyStatus.LEASE_ONLY,
        CompanyStatus.CHEAP_MUNICIPALITY,
        CompanyStatus.CALL_BACK,
        CompanyStatus.UNREACHABLE,
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.CONVERSATION,
        CompanyStatus.OFFER,
        CompanyStatus.AGREEMENT,
        CompanyStatus.PARTNER,
        CompanyStatus.OUR_MUNICIPALITY,
    ],
    [CompanyStatus.LEASE_ONLY]: [
        CompanyStatus.LEASE_ONLY,
        CompanyStatus.CALL_BACK,
        CompanyStatus.DOCUMENTS,
        CompanyStatus.DECLARATION,
        CompanyStatus.UNREACHABLE,
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.CONVERSATION,
        CompanyStatus.OFFER,
        CompanyStatus.AGREEMENT,
    ],

    [CompanyStatus.UNREACHABLE]: [
        CompanyStatus.UNREACHABLE,
        CompanyStatus.LEASE_ONLY,
        CompanyStatus.CALL_BACK,
        CompanyStatus.DOCUMENTS,
        CompanyStatus.DECLARATION,
        CompanyStatus.UNREACHABLE,
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.CONVERSATION,
        CompanyStatus.OFFER,
        CompanyStatus.AGREEMENT,
    ],
    [CompanyStatus.NEXT_CAMPAIGN]: [
        //wymagana ustawioną data nastepnego kontaktu. Z niego automatycznie ustawi się status ZADZWON jeżeli DATA NASTEPNEGO KONTAKTU będzie <= 30 dni
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.TO_BE_VERIFIED,
    ],
    [CompanyStatus.CONVERSATION]: [
        CompanyStatus.CONVERSATION,
        CompanyStatus.TO_BE_VERIFIED,
        CompanyStatus.CHEAP_MUNICIPALITY,
        CompanyStatus.LEASE_ONLY,
        CompanyStatus.UNREACHABLE,
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.CONVERSATION,
        CompanyStatus.OFFER,
        CompanyStatus.AGREEMENT,
        CompanyStatus.SIGNED_AGREEMENT_AND_LEFT,
        CompanyStatus.PARTNER,
        CompanyStatus.OUR_MUNICIPALITY,
    ],
    [CompanyStatus.AGREEMENT]: [
        CompanyStatus.AGREEMENT,
        CompanyStatus.TO_BE_VERIFIED,
        CompanyStatus.CHEAP_MUNICIPALITY,
        CompanyStatus.LEASE_ONLY,
        CompanyStatus.CONVERSATION,
        CompanyStatus.DOCUMENTS,
    ],
    [CompanyStatus.DOCUMENTS]: [
        CompanyStatus.DOCUMENTS,
        CompanyStatus.TO_BE_VERIFIED,
        CompanyStatus.CHEAP_MUNICIPALITY,
        CompanyStatus.LEASE_ONLY,
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.DECLARATION,
        CompanyStatus.SIGNED_AGREEMENT_AND_LEFT,
    ],
    [CompanyStatus.DECLARATION]: [
        CompanyStatus.DECLARATION,
        CompanyStatus.TO_BE_VERIFIED,
        CompanyStatus.CHEAP_MUNICIPALITY,
        CompanyStatus.LEASE_ONLY,
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.NEW_CLIENT,
        CompanyStatus.SIGNED_AGREEMENT_AND_LEFT,
    ],
    [CompanyStatus.NEW_CLIENT]: [
        CompanyStatus.NEW_CLIENT,
        CompanyStatus.TO_BE_VERIFIED,
        CompanyStatus.CHEAP_MUNICIPALITY,
        CompanyStatus.LEASE_ONLY,
        CompanyStatus.NEXT_CAMPAIGN,
        CompanyStatus.NEW_CLIENT,
        CompanyStatus.SIGNED_AGREEMENT_AND_LEFT,
    ],
    [CompanyStatus.OUR_CLIENT]: [
        CompanyStatus.OUR_CLIENT,
        CompanyStatus.RESIGNED,
    ],
    [CompanyStatus.RESIGNED]: [
        CompanyStatus.RESIGNED,
        CompanyStatus.TO_BE_VERIFIED,
    ],
    [CompanyStatus.SIGNED_AGREEMENT_AND_LEFT]: [
        CompanyStatus.SIGNED_AGREEMENT_AND_LEFT,
        CompanyStatus.TO_BE_VERIFIED,
    ],
    [CompanyStatus.PARTNER]: [CompanyStatus.PARTNER, CompanyStatus.OTHER],
    [CompanyStatus.OUR_MUNICIPALITY]: [
        CompanyStatus.OUR_MUNICIPALITY,
        CompanyStatus.TO_BE_VERIFIED,
    ],
    [CompanyStatus.OTHER]: [CompanyStatus.OTHER, CompanyStatus.TO_BE_VERIFIED],
}

const filteredOptions = ref<SelectOption[]>(options)

function filterOptions() {
    const selectedStatus = value.value

    if (Object.prototype.hasOwnProperty.call(statusFilters, selectedStatus)) {
        const allowedStatuses = statusFilters[selectedStatus]
        filteredOptions.value = options.filter((option) =>
            allowedStatuses.includes(option.id as CompanyStatus),
        )
    } else {
        filteredOptions.value = options
    }
}

function onUpdate(value: CompanyStatus) {
    emit('update', value)
    filterOptions()
}

watch(value, filterOptions)
watch(defaultValue!, () => {
    handleChange(defaultValue?.value)
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
