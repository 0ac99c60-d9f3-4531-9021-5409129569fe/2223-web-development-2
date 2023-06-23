import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import type { APILoginResponse } from "@filmeye/common";
import router from "@app/router";
import { useUserStore } from "@app/stores/UserStore";
import { API_ENDPOINT } from "@app/constants";

export const useLoginStore = defineStore("login", () => {
    const UserStore = useUserStore();
    const username = ref("");
    const password = ref("");
    const isUsernameInvalid = ref<boolean>(null);
    const isPasswordInvalid = ref<boolean>(null);

    function validateField(errorRef: Ref, expression: boolean) {
        errorRef.value = !!expression;
    }

    function checkValidation() {
        validateField(isUsernameInvalid, username.value === "");
        validateField(isPasswordInvalid, password.value === "");
        return !isUsernameInvalid.value && !isPasswordInvalid.value;
    }

    async function handleLogin(e: Event) {
        e.preventDefault();
        if (!checkValidation())
            return;

        const body = {
            username: username.value,
            password: password.value,
        };
        const res = await fetch(API_ENDPOINT + "/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data: APILoginResponse = await res.json();

        if (res.ok) {
            localStorage.setItem("token", data.token);
            UserStore.setCurrentUser(data);
            router.push("/");
        } else {
            isUsernameInvalid.value = true;
            isPasswordInvalid.value = true;
        }
    }

    function $reset() {
        username.value = "";
        password.value = "";
        isUsernameInvalid.value = null;
        isPasswordInvalid.value = null;
    }

    return {
        username,
        password,
        isUsernameInvalid,
        isPasswordInvalid,
        handleLogin,
        $reset,
    };
});
