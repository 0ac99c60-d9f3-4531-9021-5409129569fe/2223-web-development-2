import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { IUser } from "@filmeye/common";

export const useUserStore = defineStore("user", () => {
    const currentUser = ref<IUser>(null);
    const isLoggedIn = computed(() => !!currentUser.value);

    async function fetchUser() {
        const res = await fetch("/api/users/@me");
        const data = await res.json();
        if (res.ok)
            currentUser.value = data;
    }

    return {
        currentUser,
        isLoggedIn,
        fetchUser,
    };
});
