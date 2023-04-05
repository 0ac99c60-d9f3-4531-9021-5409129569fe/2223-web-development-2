<script setup lang="ts">
import type { CarouselProps, CarouselResponsiveOptions } from "primevue/carousel";
import Carousel from "primevue/carousel";

interface Props extends CarouselProps {
    title: string;
    // explicity redefine props so defaults are set
    numVisible?: number;
    numScroll?: number;
    circular?: boolean;
    autoplayInterval?: number;
    responsiveOptions?: CarouselResponsiveOptions[];
}

const props = withDefaults(defineProps<Props>(), {
    numVisible: 4,
    numScroll: 4,
    circular: true,
    autoplayInterval: 0,
    responsiveOptions: () => [
        {
            breakpoint: "1024px",
            numVisible: 3,
            numScroll: 2,
        },
        {
            breakpoint: "768px",
            numVisible: 2,
            numScroll: 2,
        },
        {
            breakpoint: "560px",
            numVisible: 2,
            numScroll: 2,
        },
    ],
    style: { width: "66vw" },
});
</script>

<template>
    <Carousel v-bind="props" :style="{ width: '66vw' }">
        <template #header>
            <h3>{{ props.title }}</h3>
        </template>
        <template #item="slotProps">
            <div class="item">
                <img :src="`https://image.tmdb.org/t/p/w500/${slotProps.data.poster_path}`" :style="{ width: '14vw' }">
            </div>
        </template>
    </Carousel>
</template>

<style scoped>
.p-carousel-item img {
    width: 30%;
    height: 30%;
}
.p-carousel-item img:hover {
    transform: scale(1.1);
}
</style>