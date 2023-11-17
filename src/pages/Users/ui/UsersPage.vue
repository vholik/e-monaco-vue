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

const toast = useToast()

let modalOpen = ref(false)

function openModal() {
    modalOpen.value = true
}
const { mutate } = useDeleteUser()
const { data: users, refetch: refetchUsers } = useOwners()

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
            @click="openModal"
        >
            <Icon
                color="primary-variant"
                :icon="AddIcon"
            />
            Dodaj Użytkownika
        </Button>
        <AddUsersModal v-model:isModalOpen="modalOpen"></AddUsersModal>
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
                    <DeleteButton
                        :class="cls.button"
                        @click="handleDelete(user.id)"
                    >
                        Usuń
                    </DeleteButton>
                </tr>
            </tbody>
        </table>
    </div>
</template>
