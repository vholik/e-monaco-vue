<script setup lang="ts">
import cls from './Select.module.scss'
import { computed, toRefs } from 'vue'
import {
    Combobox,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from '@headlessui/vue'
import Avatar from '@/shared/ui/Avatar/Avatar.vue'
import { type SelectOption } from './types'
import CheckIcon from '@/shared/assets/icons/Check.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Error from '@/shared/ui/Error/Error.vue'
import { Float } from '@headlessui-float/vue'
import { debounce } from 'lodash'
import inputCls from '@/shared/ui/Input/Input.module.scss'

interface Props {
    options: SelectOption[]
    withAvatar?: boolean
    hasColor?: boolean
    /**
     * @note do not work with `hasColor`
     */
    multiple?: boolean
    asInput?: boolean
    label?: string
    type?: string
    name: string
    errorMessage?: string
    modelValue: string[]
    withInput?: boolean
    inputValue?: string
}

const props = defineProps<Props>()

const { withAvatar, options, modelValue: value } = toRefs(props)

const emit = defineEmits(['update:modelValue', 'update:inputValue'])

function change(value: SelectOption | SelectOption[]) {
    if (Array.isArray(value)) {
        emit(
            'update:modelValue',
            value.map((it) => it.id),
        )
    } else {
        emit('update:modelValue', value.id)
    }
}

const currentOption = computed(() => {
    return options?.value?.filter((option) => value.value.includes(option.id))
})

const debouncedInputChange = debounce((event) => {
    console.log(event.target.value)
    emit('update:inputValue', event.target.value)
}, 500)
</script>

<template>
    <Flex
        :class="cls.Select"
        direction="column"
        align="start"
        gap="4"
    >
        <label
            v-if="label"
            :class="cls.label"
        >
            {{ label }}
        </label>
        <Combobox
            :virtual="{
                options,
            }"
            :model-value="currentOption"
            :multiple="multiple"
            @update:model-value="change"
        >
            <Float
                transition-name="fade"
                placement="bottom-start"
                portal
                origin-class="body"
            >
                <ComboboxInput
                    placeholder="Wyszukaj..."
                    :class="[inputCls.Input, inputCls.primary, inputCls.size_s]"
                    @change="debouncedInputChange"
                />
                <ComboboxOptions
                    v-slot="{ option }"
                    :class="cls.optionsWrapper"
                >
                    <ComboboxOption
                        v-slot="{ selected }"
                        :class="cls.option"
                        :value="option"
                        :data-index="option.id"
                    >
                        <Flex
                            align="center"
                            gap="4"
                            max
                        >
                            <CheckIcon v-show="selected" />
                            <Flex
                                align="center"
                                gap="2"
                            >
                                <Avatar
                                    v-if="withAvatar"
                                    :name="option.name"
                                    :role="option.role"
                                />
                                {{ option.name }}
                            </Flex>
                        </Flex>
                    </ComboboxOption>
                </ComboboxOptions>
            </Float>
        </Combobox>
        <Error
            v-if="errorMessage"
            :value="errorMessage"
        />
    </Flex>
</template>
