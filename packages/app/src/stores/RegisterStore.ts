import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import router from "@app/router";
import { useUserStore } from "@app/stores/UserStore";
import { API_ENDPOINT } from "@app/constants";
import { testPasswordStrength } from "@app/utils/testPasswordStrength";
import { VALID_USERNAME_REGEX, MAX_DISPLAY_NAME_LENGTH } from "@filmeye/common";

export const useRegisterStore = defineStore("register", () => {
    const UserStore = useUserStore();
    const username = ref("");
    const password = ref("");
    const displayName = ref("");
    const profilePicture = ref<File>(null);
    const isUsernameInvalid = ref<boolean>(null);
    const isPasswordInvalid = ref<boolean>(null);
    const isDisplayNameInvalid = ref<boolean>(null);
    const usernameError = ref("");

    function validateField(errorRef: Ref, expression: boolean) {
        errorRef.value = !!expression;
    }

    function checkValidation() {
        validateField(isDisplayNameInvalid, displayName.value.length > MAX_DISPLAY_NAME_LENGTH);
        validateField(isUsernameInvalid, !VALID_USERNAME_REGEX.test(username.value));
        usernameError.value = "";
        validateField(isPasswordInvalid, testPasswordStrength(password.value) < 2);
        return !isDisplayNameInvalid.value && !isUsernameInvalid.value && !isPasswordInvalid.value;
    }

    async function handleUpload({ files }: { files: File[] }) {
        if (files.length > 0)
            profilePicture.value = files[0];
    }

    async function handleRegister(e: Event) {
        e.preventDefault();
        if (!checkValidation())
            return;

        const formData = new FormData();
        const body = {
            username: username.value,
            password: password.value,
            displayName: displayName.value,
        };
        formData.append("image", profilePicture.value);
        formData.append("data", JSON.stringify(body));

        const res = await fetch(API_ENDPOINT + "/auth/register", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("token", data.token);
            UserStore.setCurrentUser(data);
            router.push("/");
        } else {
            if (data.code === "username_taken") {
                isUsernameInvalid.value = true;
                usernameError.value = "Username is taken";
            }
        }
    }

    function $reset() {
        username.value = "";
        password.value = "";
        displayName.value = "";
        profilePicture.value = null;
        isUsernameInvalid.value = null;
        isPasswordInvalid.value = null;
        isDisplayNameInvalid.value = null;
        usernameError.value = "";
    }

    return {
        username,
        password,
        displayName,
        isUsernameInvalid,
        isPasswordInvalid,
        isDisplayNameInvalid,
        usernameError,
        handleUpload,
        handleRegister,
        $reset,
    };
});
