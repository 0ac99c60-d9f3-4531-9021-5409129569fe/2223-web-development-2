<script lang="ts">
export type BackdropSizes = "w300" | "w780" | "w1280" | "original";
export type PosterSizes = "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original";

interface Props {
    path: string;
    type: "backdrop" | "poster";
    size: BackdropSizes | PosterSizes;
}
</script>
<script setup lang="ts">
const props = defineProps<Props>();
</script>

<template>
    <img :src="`https://image.tmdb.org/t/p/${props.size}/${props.path}`" />
</template>

<style scoped>
img {
    border-radius: 3px;
}
</style>