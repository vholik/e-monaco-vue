<script setup lang="ts">
import cls from './Tabs.module.scss'
import { TabGroup, TabList, Tab, TabPanel } from '@headlessui/vue'

interface Props {
    tabOptions: string[]
    tabPanels: unknown[]
}

defineProps<Props>()
</script>

<template>
    <TabGroup>
        <TabList :class="cls.Tabs">
            <Tab
                v-for="option in tabOptions"
                v-slot="{ selected }"
                :key="option"
                :class="cls.buttonWrapper"
            >
                <button :class="[cls.button, { [cls.selected]: selected }]">
                    {{ option }}
                </button>
            </Tab>
        </TabList>
        <TabPanel
            v-for="(_, index) in tabOptions"
            :key="index"
            :class="cls.tabPanel"
        >
            <keep-alive>
                <component :is="tabPanels[index]" />
            </keep-alive>
        </TabPanel>
    </TabGroup>
</template>
