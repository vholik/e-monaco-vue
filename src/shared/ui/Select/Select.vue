<script setup lang="ts">
import cls from './Select.module.scss'
import { computed, toRefs } from 'vue'
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
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
import Input from '@/shared/ui/Input/Input.vue'
import { debounce } from 'lodash'

interface Props {
    options: SelectOption[]
    withAvatar?: boolean
    hasColor?: boolean
    /**
     * @note do not work with `hasColor`
     */
    placeholder?: string
    multiple?: boolean
    asInput?: boolean
    label?: string
    type?: string
    name: string
    errorMessage?: string
    modelValue: string | string[]
    withInput?: boolean
    inputValue?: string
    hideValues?: boolean
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
        <Listbox
            :model-value="currentOption"
            :multiple="multiple"
            @update:model-value="change"
        >
            <Float
                transition-name="fade"
                placement="bottom-start"
                :offset="4"
                portal
                origin-class="body"
            >
                <ListboxButton
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
                            >{{ placeholder ?? 'Wybierz' }}</Text
                        >

                        <Flex
                            v-if="Array.isArray(currentOption) && !hideValues"
                            align="start"
                            gap="2"
                            style="display: block"
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
                        <span
                            v-else-if="
                                hideValues &&
                                Array.isArray(currentOption) &&
                                currentOption.length
                            "
                        >
                            Wybrano: {{ currentOption?.length }}
                        </span>
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
                </ListboxButton>

                <ListboxOptions :class="cls.optionsWrapper">
                    <Flex
                        direction="column"
                        align="start"
                        gap="2"
                        @click="(e) => e.stopPropagation"
                    >
                        <Input
                            v-if="withInput"
                            size="size_s"
                            placeholder="Wpisz wartość"
                            name="input-select"
                            @update:model-value="
                                (val) => debouncedInputChange(val)
                            " />
                        <Flex
                            direction="column"
                            max
                        >
                            <ListboxOption
                                v-for="option in options"
                                v-slot="{ selected }"
                                :key="option.id"
                                :class="cls.option"
                                :value="option"
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
                            </ListboxOption> </Flex
                    ></Flex>
                </ListboxOptions>
            </Float>
        </Listbox>
        <Error
            v-if="errorMessage"
            :value="errorMessage"
        />
    </Flex>
</template>
