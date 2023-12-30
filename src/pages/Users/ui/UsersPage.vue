<script setup lang="ts">
import { useOwners } from '@/entities/User/model/services/useOwners'
import cls from './UsersPage.module.scss'
import Breadcrumbs from '@/shared/ui/Breadcrumbs/Breadcrumbs.vue'
import Avatar from '@/shared/ui/Avatar/Avatar.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import { breadcrumbs } from '../model/consts/breadcrumbs'
import Icon from '@/shared/ui/Icon/Icon.vue'
import Button from '@/shared/ui/Button/Button.vue'
import AddIcon from '@/shared/assets/icons/Add.vue'
import { ref } from 'vue'
import AddUsersModal from '@/features/Users/ui/AddUsersModal/AddUsersModal.vue'
import DeleteButton from '@/shared/ui/DeleteButton/DeleteButton.vue'
import { useDeleteUser } from '@/features/Users/model/services/useDeleteUsers'
import { useToast } from 'vue-toastification'
import UpdatePassUserButton from '@/shared/ui/UpdatePassUserButton/UpdatePassUserButton.vue'
import { defineProps, defineEmits } from 'vue'
import { Form, useForm } from 'vee-validate'
import UpdateUserPassModal from '@/features/Users/ui/UpdateUserPassModal/UpdateUserPassModal.vue'

interface Props {
    isModalOpen: boolean
}
const addUserModalOpen = ref(false)
const updateUserPassModalOpen = ref(false)

const openAddUserModal = () => {
    addUserModalOpen.value = true
}
let selectedUserId = ref<string | null>(null)

const openUpdateUserPassModal = (userId: string) => {
    console.log('Selected User ID in openUpdateUserPassModal:', userId)
    updateUserPassModalOpen.value = true
    selectedUserId.value = userId
}

defineProps<Props>()

const { mutate } = useDeleteUser()
const { data: users } = useOwners()

const handleDelete = async (id: number) => {
    mutate(id)
}
</script>

<template>
    <div :class="cls.UsersPage">
        <Breadcrumbs
            :items="breadcrumbs"
            class="breadcrumbs"
        />
        <h1 :class="cls.title">Lista wszystkich użytkowników</h1>
        <Button
            variant="secondary"
            :max="false"
            @click="openAddUserModal"
        >
            <Icon
                color="primary-variant"
                :icon="AddIcon"
            />
            Dodaj Użytkownika
        </Button>
        <AddUsersModal v-model:isModalOpen="addUserModalOpen"></AddUsersModal>
        <UpdateUserPassModal
            v-model:isModalOpen="updateUserPassModalOpen"
            :userId="selectedUserId !== null ? selectedUserId : ''"
        ></UpdateUserPassModal>

        <table :class="[cls['user-table']]">
            <thead>
                <tr>
                    <th>Użytkownik</th>
                    <th>E-mail</th>
                    <th>Rola</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="user in users"
                    :key="user.id"
                    :class="cls.record"
                >
                    <td>
                        <div :class="cls['user-wrapper']">
                            <Avatar
                                :role="user.role"
                                :name="user.firstName + ' ' + user.lastName"
                            />
                            <span :class="[cls.text, cls.userDetails]">
                                {{ user.firstName }} {{ user.lastName }}
                            </span>
                        </div>
                    </td>

                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <Flex
                        gap="8"
                        :class="cls.buttonWrapper"
                    >
                        <DeleteButton
                            :class="(cls.button, cls.buttonUpdate)"
                            @click="handleDelete(user.id)"
                        >
                            Usuń
                        </DeleteButton>

                        <UpdatePassUserButton
                            :class="cls.button"
                            :userId="user.id"
                            @click="openUpdateUserPassModal(user.id)"
                        >
                            Zaktualizuj hasło
                        </UpdatePassUserButton>
                    </Flex>
                </tr>
            </tbody>
        </table>
    </div>
</template>
