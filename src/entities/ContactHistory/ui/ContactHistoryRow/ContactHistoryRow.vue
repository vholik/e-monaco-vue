<script setup lang="ts">
import Flex from '@/shared/ui/Flex/Flex.vue'
import cls from './ContactHistoryRow.module.scss'
import Text from '@/shared/ui/Text/Text.vue'
import { formatDate } from '@/shared/lib/date'
import DeleteButton from '@/shared/ui/DeleteButton/DeleteButton.vue'
import { useDeleteHistory } from '@/features/Company/model/services/useDeleteHistory'
import { useToast } from 'vue-toastification'
import { useUpdateContactHistory } from '@/features/Company/model/services/useUpdateHistory'
import { useContactHistories } from '@/entities/ContactHistory/model/services/useContactHistories'
import { ref, toRefs, watch } from 'vue'
import Select from '@/shared/assets/icons/Select.vue'
import { useField } from 'vee-validate'
import { ContactHistorySelect } from '@/entities/ContactHistory'
import { useContactHistoryActions } from '@/features/Company/model/services/useContactHistoryAction'
import Button from '@/shared/ui/Button/Button.vue'
import CommentInput from '@/shared/ui/CommentInput/CommentInput.vue'

interface Props {
    id: string
    contactDate: string
    contactResult: string
    comment: string
    isLoading: boolean
    error?: boolean
}

const props = defineProps<Props>()
const { id } = toRefs(props)

const { data, isLoading } = useContactHistories(id.value)

const { mutate } = useUpdateContactHistory()

const toast = useToast()

const { mutateAsync } = useDeleteHistory()

const handleDelete = async (id: string) => {
    try {
        await mutateAsync(id)
    } catch (error) {
        toast.error('Błąd podczas usuwania rekordu:', error)
    }
}

const values = ref({
    contactResult: props.contactResult,
    comment: props.comment,
})

const selectedContactResult = ref(props.contactResult)

watch(
    () => selectedContactResult.value,
    (newContactResult) => {
        if (id.value) {
            mutate({ contactResult: newContactResult, id: id.value })
        } else {
            toast.error('Błąd aktualizacji danych:', error)
        }
    },
)

const comment = ref(props.comment)

const updateComment = (value: string) => {
    values.comment = value
}

const onSubmit = async () => {
    if (id.value) {
        try {
            await mutate({ comment: values.comment, id: id.value })
            toast.success('Pomyślnie zaktualizowano historię kontaktu')
        } catch (error) {
            toast.error('Błąd aktualizacji danych:', error)
        }
    } else {
        console.error('Brak identyfikatora')
        console.log('id komentarza', id.value)
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
                <Form @submit.prevent="onSubmit">
                    <Flex gap="4">
                        <!-- <Text
                            :class="cls.text"
                            color="quatinary"
                        >
                            Dodano historię:
                        </Text>
                        <ContactHistorySelect
                            name="contactResult"
                            as-input
                            v-model="selectedContactResult"
                        /> -->
                    </Flex>
                    <Flex
                        direction="row"
                        gap="8"
                    >
                        <Text
                            size="size_s"
                            color="quinary"
                        >
                            {{ formatDate(new Date(contactDate)) }}
                        </Text>
                    </Flex>
                    <Flex
                        direction="row"
                        gap="8"
                    >
                        <Text
                            size="size_s"
                            color="quinary"
                        >
                            <CommentInput
                                name="comment"
                                placeholder="Komentarz"
                                :value="comment"
                                @keydown.enter.stop.prevent="onSubmit"
                                @click.stop=""
                                :default-value="values.comment"
                                @input="updateComment($event.target.value)"
                                :class="cls.test123"
                            />
                        </Text>
                    </Flex>
                </Form>
            </Flex>
            <DeleteButton
                :class="cls.deleteButton"
                @click="handleDelete(id)"
                @keydown.enter.prevent
            >
                Usuń
            </DeleteButton>
        </Flex>
    </div>
</template>
