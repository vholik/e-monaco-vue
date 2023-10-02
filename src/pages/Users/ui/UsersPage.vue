<script setup lang="ts">
import { useOwners } from '@/entities/User/model/services/useOwners'
import type { User } from '@/model/types/user'
import cls from './UsersPage.module.scss'
import Breadcrumbs from '@/shared/ui/Breadcrumbs/Breadcrumbs.vue'
import Avatar from '@/shared/ui/Avatar/Avatar.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import { breadcrumbs } from '../model/consts/breadcrumbs'
import Cross from '@/shared/assets/icons/Cross.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import Button from '@/shared/ui/Button/Button.vue'
import AddIcon from '@/shared/assets/icons/Add.vue'
import { ref } from 'vue'
import AddUsersModal from '@/features/Users/ui/AddUsersModal/AddUsersModal.vue'
const { data: users } = useOwners()

let modalOpen = ref(false)

function openModal() {
    modalOpen.value = true
}
</script>

<template>
    <div :class="cls.UsersPage">
        <Breadcrumbs
            :items="breadcrumbs"
            class="breadcrumbs"
        />
        <h1 :class="cls.title">Lista Wszystkich Użytkowników</h1>
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
                                :name="user.firstName"
                            />
                            <span :class="[cls.text, cls.userDetails]">
                                {{ user.firstName }} {{ user.lastName }}
                            </span>
                        </div>
                    </td>

                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <Cross></Cross>
                </tr>
            </tbody>
        </table>
    </div>
</template>
