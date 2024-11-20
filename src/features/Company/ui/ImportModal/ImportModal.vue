<script setup lang="ts">
import axios from 'axios'
import { ref, defineEmits, defineProps, watch } from 'vue'
import { useToast } from 'vue-toastification'
import Modal from '@/shared/ui/Modal/Modal.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Button from '@/shared/ui/Button/Button.vue'
import cls from './ImportModal.module.scss'
import { $api } from '@/shared/api/api'
import * as XLSX from 'xlsx'
import ImportIcon from '@/shared/assets/icons/ImportIcon.vue'

const props = defineProps<{ isModalOpen: boolean }>()
const emit = defineEmits<{
    (event: 'update:isModalOpen', value: boolean): void
}>()
const toast = useToast()

const importLoading = ref(false)
const file = ref<File | null>(null)
const fileSize = ref<string | null>(null)
const progress = ref(0)
const lastBatchJobId = ref<string | null>(null)
const importCompleted = ref(false)
const actionsDisabled = ref(true)

function openModal() {
    if (!file.value) resetImportState()
}

function resetImportState() {
    lastBatchJobId.value = null
    fileSize.value = null
    progress.value = 0
    importLoading.value = false
    actionsDisabled.value = true
    importCompleted.value = false
}

watch(
    () => props.isModalOpen,
    (newVal) => {
        if (newVal) openModal()
    },
)

function closeModal() {
    emit('update:isModalOpen', false)
    resetImportState()
}

async function handleFileUpload(selectedFile: File) {
    file.value = selectedFile
    fileSize.value = (selectedFile.size / 1024).toFixed(2) + ' KB'
    actionsDisabled.value = false
}

function handleFileDelete() {
    file.value = null
    fileSize.value = null
    actionsDisabled.value = true
}

async function uploadFile() {
    importLoading.value = true
    progress.value = 0
    try {
        const formData = new FormData()
        formData.append(
            'file',
            file.value as File,
            file.value?.name || 'import.csv',
        )

        const response = await axios.post(
            'https://seashell-app-kroor.ondigitalocean.app/companies/import',
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        progress.value = Math.round(
                            (progressEvent.loaded / progressEvent.total) * 100,
                        )
                    }
                },
            },
        )

        lastBatchJobId.value = response.data.batchJobId
        importCompleted.value = true
        toast.success('Dane zostały pomyślnie zaimportowane!')
    } catch (error) {
        toast.error('Wystąpił błąd podczas importowania danych.')
    } finally {
        importLoading.value = false
    }
}

async function checkLastImport() {
    if (!lastBatchJobId.value) {
        toast.warning('Brak danych do pobrania. Najpierw zaimportuj plik.')
        return
    }

    try {
        const response = await $api.get(
            `https://seashell-app-kroor.ondigitalocean.app/companies/import/${lastBatchJobId.value}/download`,
            { responseType: 'blob' },
        )

        const blob = new Blob([response.data], { type: 'text/csv' })
        const reader = new FileReader()
        reader.onload = (e) => {
            const csvData = e.target?.result as string
            const workbook = XLSX.read(csvData, { type: 'binary' })
            const xlsxData = XLSX.write(workbook, {
                bookType: 'xlsx',
                type: 'array',
            })
            const xlsxBlob = new Blob([xlsxData], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            })

            const url = window.URL.createObjectURL(xlsxBlob)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'last_import.xlsx')
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
        reader.readAsBinaryString(blob)
    } catch (error) {
        toast.error(
            'Wystąpił błąd podczas pobierania lub konwersji ostatniego importu.',
        )
    }
}

async function handleImportAction(action: 'approve' | 'reject') {
    if (!lastBatchJobId.value) {
        toast.warning(
            'Brak danych do zatwierdzenia/odrzucenia. Najpierw zaimportuj plik.',
        )
        return
    }

    try {
        await $api.post(
            `https://seashell-app-kroor.ondigitalocean.app/companies/import/${lastBatchJobId.value}/${action}`,
        )
        toast.success(
            `Import został ${
                action === 'approve' ? 'zatwierdzony' : 'odrzucony'
            }!`,
        )

        file.value = null
        fileSize.value = null
        closeModal()
    } catch (error) {
        toast.error(
            `Wystąpił błąd podczas ${
                action === 'approve' ? 'zatwierdzania' : 'odrzucania'
            } importu.`,
        )
    }
}
</script>

<template>
    <div :class="cls.ImportModal">
        <Modal
            :is-open="props.isModalOpen"
            title="Importuj dane"
            @update:isOpen="emit('update:isModalOpen', $event)"
        >
            <Flex
                direction="column"
                align="center"
                gap="8"
                :class="cls.wrapper"
            >
                <div
                    v-if="!file"
                    :class="cls.dropArea"
                    @drop.prevent="
                        (e) => handleFileUpload(e.dataTransfer?.files[0])
                    "
                    @dragover.prevent
                >
                    <ImportIcon :class="cls.importIcon" />
                    <input
                        ref="fileInput"
                        type="file"
                        accept=".csv"
                        @change="(e) => handleFileUpload(e.target.files[0])"
                        :class="cls.fileInput"
                    />
                    <p>
                        Przeciągnij i upuść plik lub
                        <span
                            :class="cls.highlight"
                            @click="() => $refs.fileInput.click()"
                            >kliknij tutaj</span
                        >, aby wyszukać na komputerze
                    </p>
                    <p :class="cls.fileTypeInfo">Dozwolone tylko pliki .CSV</p>
                </div>

                <div
                    v-if="file"
                    :class="cls.fileDetails"
                >
                    <Flex
                        direction="row"
                        align="center"
                        gap="8"
                    >
                        <Flex
                            direction="column"
                            align="start"
                            gap="4"
                        >
                            <p>{{ file.name }}</p>
                            <p :class="cls.fileSize">{{ fileSize }}</p>
                        </Flex>
                        <Button
                            variant="danger"
                            @click.stop="handleFileDelete"
                            >Usuń</Button
                        >
                    </Flex>
                </div>

                <div
                    v-if="importLoading"
                    :class="cls.progressBarContainer"
                >
                    <div
                        :class="cls.progressBar"
                        :style="{ width: progress + '%' }"
                    ></div>
                    <p>{{ progress }}%</p>
                </div>
            </Flex>

            <div :class="cls.footer">
                <Flex
                    gap="8"
                    direction="row"
                    align="center"
                    justify="center"
                    :class="cls.wrapper"
                >
                    <Button
                        variant="secondary"
                        @click="closeModal"
                        >Anuluj</Button
                    >
                    <Button
                        variant="primary"
                        :loading="importLoading"
                        @click="uploadFile"
                        :disabled="actionsDisabled"
                        >Zaimportuj</Button
                    >
                    <Button
                        variant="primary"
                        @click="checkLastImport"
                        :disabled="!importCompleted"
                        >Pobierz</Button
                    >
                    <Button
                        variant="danger"
                        @click="() => handleImportAction('reject')"
                        :disabled="!importCompleted"
                        >Odrzuć</Button
                    >
                    <Button
                        variant="primary"
                        @click="() => handleImportAction('approve')"
                        :disabled="!importCompleted"
                        >Zatwierdź</Button
                    >
                </Flex>
            </div>
        </Modal>
    </div>
</template>
