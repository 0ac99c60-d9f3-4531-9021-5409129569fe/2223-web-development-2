import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { IUser } from "@filmeye/common";
import { API_ENDPOINT } from "@app/constants";
import router from "@app/router";

export const useUserStore = defineStore("user", () => {
    const currentUser = ref<IUser>(null);
    const isLoggedIn = computed(() => !!currentUser.value);

    async function fetchUser() {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(API_ENDPOINT + "/users/@me", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await res.json();
        if (res.ok)
            await setCurrentUser(data);
    }

    async function setCurrentUser(user: IUser) {
        const image = await fetch(user.profilePicture)
            .then(res => res.blob())
            .then(blob => URL.createObjectURL(blob));
        user.profilePicture = image;
        currentUser.value = user;
    }

    function logOut() {
        localStorage.removeItem("token");
        currentUser.value = null;
        router.push("/");
    }

    return {
        currentUser,
        isLoggedIn,
        fetchUser,
        setCurrentUser,
        logOut,
    };
});
