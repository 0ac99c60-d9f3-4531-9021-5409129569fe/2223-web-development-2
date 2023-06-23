<script setup lang="ts">
import { onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import { useLoginStore } from "@app/stores/LoginStore";

const LoginStore = useLoginStore();
const {
    username,
    password,
    isUsernameInvalid,
    isPasswordInvalid,
} = storeToRefs(LoginStore);
const { handleLogin, $reset } = LoginStore;

onUnmounted(() => {
    $reset();
});
</script>

<template>
    <form :onSubmit="handleLogin">
        <h1 class="mt-0">Login</h1>

        <div class="fields">
            <div class="field mt-5">
                <span class="p-float-label">
                    <InputText
                        id="username"
                        v-model="username"
                        :class="{'p-invalid': !!isUsernameInvalid}"
                    />
                    <label for="username">Username</label>
                </span>
            </div>

            <div class="field mt-5">
                <span class="p-float-label">
                    <Password
                        inputId="password"
                        v-model="password"
                        toggleMask
                        :feedback="false"
                        :class="{'p-invalid': !!isPasswordInvalid}"
                    />
                    <label for="password">Password</label>
                </span>
            </div>

            <Button type="submit" label="Login" />
        </div>

        <div class="mt-3">Don't have an account? <RouterLink to="/register">Sign up now.</RouterLink></div>
    </form>
</template>

<style scoped>
.field input {
    width: 220px;
}
</style>