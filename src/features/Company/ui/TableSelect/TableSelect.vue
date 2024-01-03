<script setup lang="ts">
import Select from '@/shared/ui/Select/Select.vue'
import cls from './TableSelect.module.scss'
import { useCompanyFilterStore } from '@/features/CompanyFilter'

const store = useCompanyFilterStore()

const options = [
    { id: 'nextContactDate', name: 'Nast. konakt' },
    { id: 'contactHistories', name: 'Historia kontaktów' },
    { id: 'owner', name: 'Właściciel' },
    { id: 'comment', name: 'Komentarz' },
    { id: 'nip', name: 'NIP' },
    { id: 'name', name: 'Nazwa firmy' },
    { id: 'supply', name: 'Tabor' },
    { id: 'frugality', name: 'Oszczędność' },
    { id: 'status', name: 'Status' },
    { id: 'municipality', name: 'Gmina' },
    { id: 'taxincrease', name: 'Wzrost podatku' },
    { id: 'kitrate', name: 'Zestaw' },
    { id: 'year', name: 'Rok' },
    { id: 'fullName', name: 'Imię i nazwisko' },
    { id: 'role', name: 'Rola' },
    { id: 'phone', name: 'Telefon' },
    { id: 'email', name: 'E-mail' },
    { id: 'activation', name: 'Aktywacja' },
    { id: 'rentalFee', name: 'Czynsz' },
    { id: 'statement', name: 'Deklaracja' },
    { id: 'tractor', name: 'Stawka ciągnik' },
    { id: 'trailer', name: 'Stawka naczepa' },
    { id: 'ourTaxes', name: 'Podatek u nas' },
    { id: 'theirsTaxes', name: 'Podatek u nich' },
    { id: 'tractorAmount', name: 'Ciągniki' },
    { id: 'trailerAmount', name: 'Naczepy' },
    { id: 'otherAmount', name: 'Inne' },
    { id: 'contactPersons', name: 'Osoby kontaktowe' },
]
</script>

<template>
    <Select
        :class="cls.TableSelect"
        :options="options"
        :multiple="true"
        v-bind="$props"
        name="table-select"
        placeholder="Pola do wyśw."
        as-input
        :model-value="store.getTables ?? options.map((it) => it.id)"
        @update:model-value="store.setTables"
    />
</template>
