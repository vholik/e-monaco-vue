<script setup lang="ts">
import cls from './ContactHistoryFeed.module.scss'
import LoaderContainer from '@/shared/ui/LoaderContainer/LoaderContainer.vue'
import ContactHistoryRow from '../ContactHistoryRow/ContactHistoryRow.vue'
import { useContactHistories } from '../../model/services/useContactHistories'
import Text from '@/shared/ui/Text/Text.vue'
import { toRefs } from 'vue'

interface Props {
    companyId: string
}

const props = defineProps<Props>()

const { companyId } = toRefs(props)

const { data, isLoading } = useContactHistories(companyId.value)
</script>

<template>
    <div :class="cls.ContactHistoryFeed">
        <LoaderContainer :is-loading="isLoading">
            <ContactHistoryRow
                v-for="contact in data"
                :id="contact.id"
                :key="contact.id"
                :contact-date="contact.contactDate"
                :contact-result="contact.contactResult"
                :comment="contact.comment"
            />

            <div :class="cls.noData">
                <Text
                    v-if="!isLoading && !data?.length"
                    size="size_s"
                    color="quatinary"
                    align-center
                    >Nie znaleziono żadnych historii. Klinij "Dodaj historię"
                    aby dodać nową"</Text
                >
            </div>
        </LoaderContainer>
    </div>
</template>
