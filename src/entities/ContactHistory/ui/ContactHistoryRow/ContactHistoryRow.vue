<script setup lang="ts">
import Flex from '@/shared/ui/Flex/Flex.vue'
import cls from './ContactHistoryRow.module.scss'
import Text from '@/shared/ui/Text/Text.vue'
import { formatDateLikeFacebook } from '@/shared/lib/date'
import DeleteButton from '@/shared/ui/DeleteButton/DeleteButton.vue'
import { useDeleteHistory } from '@/features/Company/model/services/useDeleteHistory'
import { useToast } from 'vue-toastification'
import { useUpdateContactHistory } from '@/features/Company/model/services/useUpdateHistory'
import { useContactHistories } from '@/entities/ContactHistory/model/services/useContactHistories'
import { ref, toRefs } from 'vue'

interface Props {
    id: string
    contactDate: string
    contactResult: string
    comment: string
}

let selectedHistoryId = ref<string | null>(null)

const props = defineProps<Props>()

const { id } = toRefs(props)

const { data, isLoading } = useContactHistories(id.value)

const toast = useToast()

const { mutateAsync } = useDeleteHistory()

const handleDelete = async (id: string) => {
    try {
        await mutateAsync(id)
    } catch (error) {
        toast.error('Błąd podczas usuwania rekordu:', error)
    }
}
</script>

<template>
    <div :class="cls.ContactHistoryRow">
        <Flex
            direction="column"
            align="start"
            gap="6"
        >
            <Flex
                direction="column"
                align="start"
                gap="2"
            >
                <Flex gap="4">
                    <Text color="quatinary">Dodano historię: </Text>
                    <Text
                        color="primary"
                        weight="medium"
                        >{{ contactResult }}</Text
                    >
                    <DeleteButton
                        :class="cls.deleteButton"
                        @click="handleDelete(id)"
                    >
                        Usuń
                    </DeleteButton>
                </Flex>
                <Flex
                    direction="row"
                    gap="8"
                >
                    <Text
                        size="size_s"
                        color="quinary"
                    >
                        {{
                            formatDateLikeFacebook(new Date(contactDate))
                        }}</Text
                    >
                </Flex>
            </Flex>

            <div
                v-if="comment"
                :class="cls.comment"
            >
                {{ comment }}
            </div>
        </Flex>
    </div>
</template>
