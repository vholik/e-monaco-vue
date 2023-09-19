<script setup lang="ts">
import cls from './Tabs.module.scss'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

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
            <component :is="tabPanels[index]" />
        </TabPanel>
    </TabGroup>
</template>
