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
import { ref } from 'yup'
import Input from '@/shared/ui/Input/Input.vue'

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

const props = withDefaults(defineProps<Props>(), {
    errorMessage: '',
})

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
        return options.value.filter((option) => value.value.includes(option.id))
    }

    return options.value.find((option) => option.id === value.value)
})

const inputElement = ref('inputElement')
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
            :multiple="multiple"
            :model-value="currentOption"
            @update:model-value="change"
        >
            <ListboxButton
                ref="inputElement"
                :style="{
                    color:
                        !Array.isArray(currentOption) && currentOption?.color,
                    backgroundColor:
                        !Array.isArray(currentOption) && currentOption?.bgColor,
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
                    {{
                        Array.isArray(currentOption)
                            ? currentOption.map((it) => it.name).join(', ')
                            : currentOption?.name
                    }}
                </Flex>

                <Icon
                    v-if="
                        !Array.isArray(currentOption) && !currentOption?.color
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
            <transition
                name="fade"
                mode="out-in"
            >
                <ListboxOptions :class="cls.optionsWrapper">
                    <Flex
                        direction="column"
                        align="start"
                        gap="2"
                    >
                        <Input
                            v-if="withInput"
                            size="size_s"
                            placeholder="Wpisz imię"
                            name="name"
                            @update:model-value="
                                (val) => emit('update:inputValue', val)
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
            </transition>
        </Listbox>
        <Error
            v-if="errorMessage"
            :value="errorMessage"
        />
    </Flex>
</template>
