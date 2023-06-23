<script lang="ts">
import type { CarouselProps, CarouselResponsiveOptions } from "primevue/carousel";

interface Props extends CarouselProps {
    title: string;
    // explicity redefine props so defaults are set
    numVisible?: number;
    numScroll?: number;
    circular?: boolean;
    autoplayInterval?: number;
    responsiveOptions?: CarouselResponsiveOptions[];
}
</script>
<script setup lang="ts">
import Carousel from "primevue/carousel";

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
            numVisible: 3,
            numScroll: 3,
        },
        {
            breakpoint: "560px",
            numVisible: 4,
            numScroll: 4,
        },
    ],
});
</script>

<template>
    <Carousel v-bind="props">
        <template #header>
            <h3>{{ props.title }}</h3>
        </template>
        <template #item="slotProps">
            <div class="item" v-tooltip.bottom="slotProps.data.title">
                <RouterLink :to="`/movies/${slotProps.data.id}`">
                    <img
                        :src="`https://image.tmdb.org/t/p/w500/${slotProps.data.poster_path}`"
                        :style="{ width: '14vw' }"
                        :title="slotProps.data.title"
                    />
                </RouterLink>
            </div>
        </template>
    </Carousel>
</template>

<style scoped>
.p-carousel {
    width: 66vw;
}
@media screen and (max-width: 768px) {
    .p-carousel {
        width: 88vw;
    }
}
.p-carousel-item img {
    width: 30%;
    height: 30%;
}
.p-carousel-item img:hover {
    transform: scale(1.1);
}
</style>