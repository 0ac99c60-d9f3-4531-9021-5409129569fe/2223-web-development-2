<script setup lang="ts">
import { RouterLink } from "vue-router";
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import Fieldset from "primevue/fieldset";
import Rating from "primevue/rating";
import type { IReview } from "@filmeye/common";
import { toRefs } from "vue";

const props = defineProps<{
    review: IReview;
}>();
const { review } = toRefs(props);
</script>

<template>
    <Fieldset>
        <template #legend>
            <div class="flex align-items-center text-primary">
                <RouterLink :to="`/profile/@${review.user.username}`">
                    <Avatar
                        :image="review.user.profilePicture"
                        size="normal"
                        shape="circle"
                        class="profilePicture"
                    />
                    <span class="font-bold text-lg">{{ review.user.displayName }}</span>
                </RouterLink>
            </div>
        </template>
        <div class="m-0">
            <div class="flex justify-content-between">
                <Rating :modelValue="review.rating" :cancel="false" readonly />
                <span class="p-buttonset">
                    <Button icon="pi pi-pencil" v-tooltip.top="'Edit review'" outlined size="small" />
                    <Button icon="pi pi-trash" v-tooltip.top="'Delete review'" outlined size="small" />
                </span>
            </div>
            <time>{{ new Date(review.createdAt).toLocaleDateString("en-US", { dateStyle: "long" }) }}</time>
            <p>{{ review.message }}</p>
        </div>
    </Fieldset>
</template>

<style>
.p-fieldset-legend {
    padding-top: 0 !important;
}
.p-fieldset-legend a {
    text-decoration: none;
}
.p-fieldset-legend .profilePicture {
    margin: 0.5rem;
    position: relative;
    top: 10px;
}
.p-fieldset .p-fieldset-content {
    padding: 0 1rem 0 1rem;
}
</style>