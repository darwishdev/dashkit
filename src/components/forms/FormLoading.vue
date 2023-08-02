<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
</script>
<template>
    <div class="bg-card p-4 flex flex-column justify-content-center border-round">
        <div class="flex justify-content-center w-full" v-for="i in 3" :key="i">
            <Skeleton height="2.5rem" width="35rem" class="m-3"></Skeleton>
            <Skeleton height="2.5rem" width="60rem" class="m-3"></Skeleton>
            <Skeleton height="2.5rem" width="60rem" class="m-3"></Skeleton>
            <Skeleton height="2.5rem" width="60rem" class="m-3"></Skeleton>
            <Skeleton height="2.5rem" width="60rem" class="m-3"></Skeleton>
        </div>
        <Skeleton height="2.5rem" width="10rem" class="m-3"></Skeleton>
    </div>
</template>