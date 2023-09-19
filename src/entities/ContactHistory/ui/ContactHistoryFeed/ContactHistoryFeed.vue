<script setup lang="ts">
import cls from './ContactHistoryFeed.module.scss'
import ContactHistoryRow from '../ContactHistoryRow/ContactHistoryRow.vue'

const contactHistory = [
    {
        id: '1',
        contactDate: '2342.03.234',
        contactResult: 'OK',
        comment: 'siema siema komentarz',
    },
    {
        id: '2',
        contactDate: '2342.03.234',
        contactResult: 'OK',
        comment: 'siema siema komentarz',
    },
    {
        id: '3',
        contactDate: '2342.03.234',
        contactResult: 'OK',
        comment: 'siema siema komentarz',
    },
]
</script>

<template>
    <div :class="cls.ContactHistoryFeed">
        <ContactHistoryRow
            v-for="contact in contactHistory"
            :id="contact.id"
            :key="contact.id"
            :contact-date="contact.contactDate"
            :contact-result="contact.contactResult"
            :comment="contact.comment"
        />
    </div>
</template>
