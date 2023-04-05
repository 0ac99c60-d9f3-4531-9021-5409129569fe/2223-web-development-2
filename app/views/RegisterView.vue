<script setup lang="ts">
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import { storeToRefs } from "pinia";
import { useRegisterStore } from "@/stores/RegisterStore";
import { useUserStore } from "@/stores/UserStore";

const RegisterStore = useRegisterStore();
const UserStore = useUserStore();
const {
    email,
    username,
    password,
    isEmailInvalid,
    isUsernameInvalid,
    isPasswordInvalid,
} = storeToRefs(RegisterStore);
const { handleRegister } = RegisterStore;

console.log(UserStore.currentUser);
</script>

<template>
    <form :onSubmit="handleRegister">
        <h2>Sign up</h2>

        <div class="fields">
            <div class="field">
                <label for="email">Email</label>
                <InputText
                    type="email"
                    id="email"
                    v-model="email"
                    class="p-2"
                    :class="{'p-invalid': !!isEmailInvalid}"
                />
            </div>

            <div class="field">
                <label for="username">Username</label>
                <InputText
                    id="username"
                    v-model="username"
                    class="p-2"
                    :class="{'p-invalid': !!isUsernameInvalid}"
                />
            </div>

            <div class="field">
                <label for="password">Password</label>
                <Password
                    inputId="password"
                    v-model="password"
                    :feedback="true"
                    toggleMask
                    :class="{'p-invalid': !!isPasswordInvalid}"
                />
            </div>

            <Button type="submit" label="Sign up" />
        </div>

        <div class="mt-3">
            <RouterLink to="/login">Already have an account?</RouterLink>
        </div>
    </form>
</template>

<style scoped>
.field label {
    display: block;
}
.field input {
    width: 220px;
}
</style>