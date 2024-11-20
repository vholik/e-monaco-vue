<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import Option from '@/shared/ui/Option/Option.vue'
import ConfirmDeleteModal from '@/shared/ui/ConfirmDeleteModal/ConfirmDeleteModal.vue'
import { useDeleteCompanies } from '@/features/Company/model/services/useDeleteCompany'
import { useAddCompany } from '@/features/Company/model/services/useAddCompany'
import cls from './CompaniesSetting.module.scss'
import { useToast } from 'vue-toastification'
import { addCompanyValidationSchema } from '@/features/Company/model/lib/addCompanySchema'

const dropdownOptions = [
    { id: 'delete', name: 'Usuń' },
    { id: 'duplicate', name: 'Duplikuj' },
]

const props = defineProps({
    leadId: {
        type: String,
        required: true,
    },
    leadData: {
        type: Object,
        required: true,
    },
})

const toast = useToast()
const isModalOpen = ref(false)
const idToDelete = ref<string | null>(null)
const isDuplicating = ref(false)
const emit = defineEmits(['delete'])
const { mutateAsync: deleteCompany } = useDeleteCompanies(() => {
    isModalOpen.value = false
})

const { mutateAsync: addCompany } = useAddCompany(() => {
    toast.success('Pomyślnie zduplikowano firmę!')
    isDuplicating.value = false
})

const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return email ? emailRegex.test(email) : false
}

const formatNip = (nip: string) => {
    if (!nip) return ''
    return nip
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1-$2-$3-$4')
}

const getDuplicatedCompanyData = (leadData: any) => {
    const rawLeadData = JSON.parse(JSON.stringify(leadData))

    const duplicatedData = {
        nextContactDate: rawLeadData.nextContactDate
            ? new Date(rawLeadData.nextContactDate).toISOString()
            : new Date().toISOString(),
        last_contact_comment: rawLeadData.last_contact_comment || '',
        comment: rawLeadData.last_contact_comment || '',
        lastContactDate: rawLeadData.last_contact_date
            ? new Date(rawLeadData.last_contact_date).toISOString()
            : null,
        ownerId: rawLeadData.owner?.id || '',
        nip: formatNip(rawLeadData.nip),
        name: rawLeadData.name ? `${rawLeadData.name} - Kopia` : '',
        status: rawLeadData.status || '',
        municipalityId: rawLeadData.municipality?.id || '',
        campaignId: rawLeadData.campaignId || '',
        tractorAmount: rawLeadData.tractorAmount || 0,
        trailerAmount: rawLeadData.trailerAmount || 0,
        otherAmount: rawLeadData.otherAmount || 0,
        activation: rawLeadData.activation || 0,
        rentalFee: rawLeadData.rentalFee || 0,
        statement: rawLeadData.statement || 0,
        kitrate: rawLeadData.kitrate || 0,
        supply: rawLeadData.supply || 0,
        taxincrease: rawLeadData.taxincrease || 0,
        theirstaxes: rawLeadData.theirstaxes || 0,
        ourtaxes: rawLeadData.ourtaxes || 0,
        other: rawLeadData.other || 0,
        phone: rawLeadData.phone || '',
        contactPersons: rawLeadData.contactPersons
            ? rawLeadData.contactPersons.map((person) => ({
                  id: person.id,
                  firstName: person.firstName || '',
                  lastName: person.lastName || '',
                  role: person.role || '',
                  phone: person.phone || '',
                  email: isValidEmail(person.email) ? person.email : null,
              }))
            : [],
        metadata: JSON.parse(JSON.stringify(rawLeadData.metadata || {})),
    }

    try {
        return addCompanyValidationSchema.validateSync(duplicatedData, {
            abortEarly: false,
        })
    } catch (err) {
        throw new Error('Nieprawidłowe dane do duplikowania firmy.')
    }
}

const handleSelect = async (option: any, leadId: string) => {
    if (leadId && option.id === 'delete') {
        idToDelete.value = leadId
        isModalOpen.value = true
    }

    if (leadId && option.id === 'duplicate' && !isDuplicating.value) {
        isDuplicating.value = true
        try {
            const duplicatedData = getDuplicatedCompanyData(props.leadData)
            await addCompany(duplicatedData)
        } catch (error) {
            toast.error('Błąd podczas duplikowania firmy: ' + error.message)
            isDuplicating.value = false
        }
    }
}

const confirmDelete = async () => {
    if (idToDelete.value !== null) {
        try {
            await deleteCompany(idToDelete.value)
        } catch (error) {
            toast.error('Błąd podczas usuwania: ' + error.message)
        } finally {
            isModalOpen.value = false
        }
    }
}
</script>

<template>
    <div :class="cls.container">
        <Option
            :leadId="leadId"
            :options="dropdownOptions"
            @select="handleSelect"
        />
        <ConfirmDeleteModal
            :isOpen="isModalOpen"
            @update:isOpen="isModalOpen = false"
            @confirmDelete="confirmDelete"
        />
    </div>
</template>
