<script setup lang="ts">
import cls from './CampaignSelect.module.scss'
import { watch, toRefs } from 'vue'
import Select from '@/shared/ui/Select/Select.vue'
import { useField } from 'vee-validate'
import { useCampaigns } from '@/features/Campaign/model/services/useCampaign'
import type { Campaign } from '@/entities/Campaign/model/types/campaign'

const { data } = useCampaigns()

interface Props {
    asInput?: boolean
    label?: string
    name: string
    defaultValue?: string | string[]
    multiple?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits(['update', 'update:modelValue'])

const { name, defaultValue, multiple } = toRefs(props)

const { errorMessage, value, handleChange } = useField<string | string[]>(
    name,
    undefined,
    {
        initialValue: defaultValue?.value,
    },
)

function onUpdate(newValue: string | string[]) {
    handleChange(newValue)
    emit('update', newValue)
    emit('update:modelValue', newValue)
}

watch(defaultValue!, () => {
    handleChange(defaultValue?.value)
})
</script>

<template>
    <div
        v-if="data"
        :class="cls.CampaignSelect"
    >
        <Select
            v-model="value"
            :multiple="multiple"
            :options="
                data.map((it: Campaign) => ({
                    id: it.id,
                    name: it.season ? `${it.title} ${it.season}` : it.title,
                }))
            "
            :as-input="asInput"
            :label="label"
            v-bind="$props"
            :error-message="errorMessage"
            @update:model-value="onUpdate"
        />
    </div>
</template>
