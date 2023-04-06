<script setup lang="ts">
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";

const username = ref("");
const password = ref("");
const isUsernameValid = ref(true);
const isPasswordValid = ref(true);

function onSubmit(e: Event) {
    e.preventDefault();
    alert("test");
}
</script>

<template>
    <form :onSubmit="onSubmit">
        <h2>Login</h2>

        <div class="fields">
            <div class="field mt-5">
                <span class="p-float-label">
                    <InputText
                        id="username"
                        v-model="username"
                        :class="{ 'p-invalid': !isUsernameValid }"
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
                        :class="{ 'p-invalid': !isPasswordValid }"
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