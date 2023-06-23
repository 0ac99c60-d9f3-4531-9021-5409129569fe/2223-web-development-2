<script setup lang="ts">
import { onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import FileUpload from "primevue/fileupload";
import Button from "primevue/button";
import { useRegisterStore } from "@app/stores/RegisterStore";
import { VALID_IMAGE_TYPES, MAX_IMAGE_SIZE } from "@filmeye/common";

const RegisterStore = useRegisterStore();
const {
    username,
    password,
    displayName,
    isUsernameInvalid,
    isPasswordInvalid,
    isDisplayNameInvalid,
    usernameError,
} = storeToRefs(RegisterStore);
const { handleRegister, handleUpload, $reset } = RegisterStore;

onUnmounted(() => {
    $reset();
});
</script>

<template>
    <form :onSubmit="handleRegister">
        <h1 class="mt-0">Sign up</h1>

        <div class="fields">
            <div class="field">
                <label for="username">Username</label>
                <InputText
                    id="username"
                    v-model="username"
                    class="p-2"
                    :class="{'p-invalid': !!isUsernameInvalid}"
                />
                <small class="block p-error" id="text-error">{{ usernameError }}</small>
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

            <div class="field">
                <label for="profilePicture">Profile picture</label>
                <FileUpload
                    mode="basic"
                    name="profilePicture[]"
                    :accept="VALID_IMAGE_TYPES.join(', ')"
                    :maxFileSize="MAX_IMAGE_SIZE"
                    @select="handleUpload"
                />
            </div>

            <div class="field">
                <label for="displayName">Display Name</label>
                <InputText
                    id="displayName"
                    v-model="displayName"
                    class="p-2"
                    :class="{'p-invalid': !!isDisplayNameInvalid}"
                />
            </div>

            <div class="my-3 text-400">
                <small>By creating an account you agree to the Terms of Service.</small>
            </div>

            <Button type="submit" label="Create your account" severity="success" />
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