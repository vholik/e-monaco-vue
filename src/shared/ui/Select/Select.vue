<script setup lang="ts">
import cls from './Select.module.scss'
import { toRefs } from 'vue'
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

interface Props {
    modelValue: SelectOption[] | SelectOption
    options?: SelectOption[]
    withAvatar?: boolean
    hasColor?: boolean
    /**
     * @note do not work with `hasColor`
     */
    multiple?: boolean
}

const emit = defineEmits(['update:modelValue'])

const props = defineProps<Props>()

const { modelValue, withAvatar, hasColor, options } = toRefs(props)

function change(value: SelectOption) {
    emit('update:modelValue', value)
}
</script>

<template>
    <div :class="cls.Select">
        <Listbox
            @update:model-value="change"
            :multiple="multiple"
        >
            <ListboxButton
                :style="{
                    color: !Array.isArray(modelValue) && modelValue.color,
                    backgroundColor:
                        !Array.isArray(modelValue) && modelValue.bgColor,
                }"
                :class="[
                    cls.button,
                    {
                        [cls[
                            !Array.isArray(modelValue) ? modelValue.color! : ''
                        ]]: hasColor,
                    },
                ]"
            >
                <Avatar
                    v-if="withAvatar && !Array.isArray(modelValue)"
                    :name="modelValue.name"
                />
                <Text
                    size="size_s"
                    v-if="Array.isArray(modelValue) && !modelValue.length"
                    color="quatinary"
                    >Wybierz</Text
                >
                {{
                    Array.isArray(modelValue)
                        ? modelValue.map((it) => it.name).join(', ')
                        : modelValue.name
                }}
                <Icon
                    v-if="!Array.isArray(modelValue) && !modelValue.color"
                    :icon="SelectIcon"
                    color="secondary"
                />
                <SelectIcon
                    v-else
                    :style="{
                        fill: !Array.isArray(modelValue) && modelValue.color,
                    }"
                />
            </ListboxButton>
            <transition
                name="fade"
                mode="out-in"
            >
                <ListboxOptions :class="cls.optionsWrapper">
                    <ListboxOption
                        v-slot="{ selected }"
                        :class="cls.option"
                        v-for="option in options"
                        :key="option.id"
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
                                />
                                {{ option.name }}
                            </Flex>

                            <CheckIcon v-show="selected" />
                        </Flex>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </Listbox>
    </div>
</template>
