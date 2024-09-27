<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import ArrowDown from '@/shared/assets/icons/ArrowDown.vue'
import DuplicateIcon from '@/shared/assets/icons/DuplicateIcon.vue'
import DeleteIcon from '@/shared/assets/icons/DeleteIcon.vue'
import cls from './Option.module.scss'

const props = defineProps({
    leadId: {
        type: String,
        required: true,
    },
})

const buttonText = 'Ustawienia'

const getButtonClasses = (active) => {
    return [active ? cls.activeButton : cls.inactiveButton, cls.button]
}
</script>

<template>
    <div :class="cls.wrapper">
        <Menu
            as="div"
            :class="cls.menu"
        >
            <div>
                <MenuButton :class="cls.menuButton">
                    <span>{{ buttonText }}</span>
                    <ArrowDown
                        :class="cls.icon"
                        aria-hidden="true"
                    />
                </MenuButton>
            </div>

            <transition
                :enter-active-class="cls.transitionEnterActive"
                :enter-from-class="cls.transitionEnter"
                :enter-to-class="cls.transitionEnterTo"
                :leave-active-class="cls.transitionLeaveActive"
                :leave-from-class="cls.transitionLeave"
                :leave-to-class="cls.transitionLeaveTo"
            >
                <MenuItems
                    as="div"
                    :class="cls.menuItems"
                >
                    <div :class="cls.menuSection">
                        <MenuItem v-slot="{ active }">
                            <button
                                :class="getButtonClasses(active)"
                                @click="
                                    $emit('select', { id: 'duplicate' }, leadId)
                                "
                            >
                                <DuplicateIcon
                                    :class="cls.icon"
                                    aria-hidden="true"
                                />
                                Duplikuj
                            </button>
                        </MenuItem>
                    </div>
                    <div :class="cls.menuSection">
                        <MenuItem v-slot="{ active }">
                            <button
                                :class="getButtonClasses(active)"
                                @click="
                                    $emit('select', { id: 'delete' }, leadId)
                                "
                            >
                                <DeleteIcon
                                    :class="cls.icon"
                                    aria-hidden="true"
                                />
                                Usuń
                            </button>
                        </MenuItem>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
    </div>
</template>
