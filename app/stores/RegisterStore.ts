import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import Password from "primevue/password";
import type { User } from "@/interfaces/User";
import router from "@/router";
import { useUserStore } from "./UserStore";

// TODO: move to constants file
const VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const MAX_EMAIL_LENGTH = 100;
const VALID_USERNAME_REGEX = /^[a-zA-Z0-9]{3,100}$/;

export const useRegisterStore = defineStore("register", () => {
    const UserStore = useUserStore();
    const email = ref("");
    const username = ref("");
    const password = ref("");
    const isEmailInvalid = ref<boolean>(null);
    const isUsernameInvalid = ref<boolean>(null);
    const isPasswordInvalid = ref<boolean>(null);

    // @ts-ignore
    const mediumRegex = new RegExp(Password.props.mediumRegex.default);
    // @ts-ignore
    const strongRegex = new RegExp(Password.props.strongRegex.default);

    function testStrength(str: string) {
        let level = 0;

        if (strongRegex.test(str)) level = 3;
        else if (mediumRegex.test(str)) level = 2;
        else if (str.length) level = 1;

        return level;
    }

    function validateField(errorRef: Ref, expression: boolean) {
        errorRef.value = !!expression;
    }

    function checkValidation() {
        validateField(isEmailInvalid, !VALID_EMAIL_REGEX.test(email.value) || email.value.length > MAX_EMAIL_LENGTH);
        validateField(isUsernameInvalid, !VALID_USERNAME_REGEX.test(username.value));
        validateField(isPasswordInvalid, testStrength(password.value) < 2);
        return !isEmailInvalid.value && !isUsernameInvalid.value && !isPasswordInvalid.value;
    }

    async function handleRegister(e: Event) {
        e.preventDefault();
        if (!checkValidation())
            return;

        // const body = {};
        // const res = await fetch("/api/auth/register", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(body),
        // });
        // const data = await res.json();
        // if (res.ok) {
        //     localStorage.setItem("token", data.token);
        //     UserStore.currentUser = data;
        //     router.push("/");
        // }
    }

    return {
        email,
        username,
        password,
        isEmailInvalid,
        isUsernameInvalid,
        isPasswordInvalid,
        handleRegister,
    };
});
