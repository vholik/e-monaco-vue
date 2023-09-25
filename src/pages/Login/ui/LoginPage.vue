<script setup lang="ts">
import { Form } from 'vee-validate'
import cls from './LoginPage.module.scss'
import Input from '@/shared/ui/Input/Input.vue'
import Button from '@/shared/ui/Button/Button.vue'
import Text from '@/shared/ui/Text/Text.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Logo from '@/shared/ui/Logo/Logo.vue'
import { loginValidationSchema } from '../model/lib/authLogin'
import { useLogin } from '../model/services/useLogin'
import Note from '@/shared/ui/Note/Note.vue'

const { isLoading, isError, mutate, isSuccess } = useLogin()

const onSubmit = (values: Record<string, unknown>) => {
    mutate(values)
}
</script>

<template>
    <section :class="cls.LoginPage">
        <Form
            :validation-schema="loginValidationSchema"
            @submit="onSubmit"
        >
            <Logo></Logo>
            <Flex
                direction="column"
                gap="16"
                :class="cls.container"
            >
                <Note v-if="isError"
                    >Nie udało nam się zalogować. Sprawdź dane albo spróbuj
                    ponownie później</Note
                >
                <Flex
                    direction="column"
                    :max="true"
                    gap="8"
                >
                    <Flex
                        direction="column"
                        gap="4"
                    >
                        <Text
                            :is-title="true"
                            size="size_xxl"
                            weight="superbold"
                            >Witamy z powrotem</Text
                        >
                        <Text
                            size="size_s"
                            color="secondary"
                            >Witamy z powrotem, podaj swoje dane</Text
                        >
                    </Flex>
                    <Flex
                        direction="column"
                        :max="true"
                        gap="6"
                    >
                        <Input
                            label="Email"
                            placeholder="Podaj swój e-mail"
                            name="email"
                        />

                        <Input
                            label="Hasło"
                            placeholder="Podaj swoje hasło"
                            type="password"
                            name="password"
                        />
                    </Flex>
                </Flex>
                <Button :disabled="isLoading || isSuccess">Zaloguj się</Button>
            </Flex>
        </Form>
    </section>
</template>
../model/services/userLogin
