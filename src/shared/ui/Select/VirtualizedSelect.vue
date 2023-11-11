<script setup lang="ts">
import cls from './Select.module.scss'
import { computed, ref, toRefs } from 'vue'
import {
    Combobox,
    ComboboxButton,
    ComboboxOption,
    ComboboxOptions,
} from '@headlessui/vue'
import SelectIcon from '@/shared/assets/icons/Select.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import Avatar from '@/shared/ui/Avatar/Avatar.vue'
import { type SelectOption } from './types'
import CheckIcon from '@/shared/assets/icons/Check.vue'
import Text from '@/shared/ui/Text/Text.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Error from '@/shared/ui/Error/Error.vue'
import { Float } from '@headlessui-float/vue'
import { debounce } from 'lodash'

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
    modelValue: string | string[]
    withInput?: boolean
    inputValue?: string
}

const props = defineProps<Props>()

const { withAvatar, hasColor, options, modelValue: value } = toRefs(props)

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
    if (Array.isArray(value.value)) {
        return options?.value?.filter((option) =>
            value.value.includes(option.id),
        )
    }

    return options?.value?.find((option) => option.id === value.value)
})

const debouncedInputChange = debounce((value) => {
    emit('update:inputValue', value)
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
                <ComboboxButton
                    :style="{
                        color:
                            !Array.isArray(currentOption) &&
                            currentOption?.color,
                        backgroundColor:
                            !Array.isArray(currentOption) &&
                            currentOption?.bgColor,
                    }"
                    :class="[
                        cls.button,
                        {
                            [cls[
                                !Array.isArray(currentOption)
                                    ? currentOption?.color!
                                    : ''
                            ]]: hasColor,
                            [cls.input]: asInput,
                        },
                    ]"
                >
                    <Flex gap="4">
                        <Avatar
                            v-if="
                                withAvatar &&
                                !Array.isArray(currentOption) &&
                                currentOption
                            "
                            :role="currentOption.role"
                            :name="currentOption.name"
                        />
                        <Text
                            v-if="
                                (Array.isArray(currentOption) &&
                                    !currentOption.length) ||
                                !currentOption
                            "
                            size="size_s"
                            weight="medium"
                            color="secondary"
                            >Wybierz</Text
                        >

                        <Flex
                            v-if="Array.isArray(currentOption)"
                            align="start"
                            gap="2"
                        >
                            <VTooltip
                                v-for="(item, index) in currentOption"
                                :key="item.id"
                            >
                                <a>{{ item.name }}</a
                                ><span v-if="index !== currentOption.length - 1"
                                    >,</span
                                >
                                <template #popper>
                                    {{ item.info }}
                                </template>
                            </VTooltip>
                        </Flex>
                        <span v-else>
                            {{ currentOption?.name }}
                        </span>
                    </Flex>

                    <Icon
                        v-if="
                            !Array.isArray(currentOption) &&
                            !currentOption?.color
                        "
                        :icon="SelectIcon"
                        color="secondary"
                    />
                    <SelectIcon
                        v-else
                        :style="{
                            fill:
                                !Array.isArray(currentOption) &&
                                currentOption?.color,
                        }"
                    />
                </ComboboxButton>

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
                            justify="between"
                            gap="4"
                        >
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

                            <CheckIcon v-show="selected" />
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
