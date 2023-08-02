<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
</script>
<template>
    <div class="app-card m-2 flex border-round bg-card my-3">
        <Skeleton size="10rem"></Skeleton>
        <div class="flex-grow-1  flex align-items-center justify-content-center">
            <div class="absolute top-0 right-0 p-2 flex">
                <Skeleton shape="circle" size="2rem" class="mr-2"></Skeleton>
                <Skeleton shape="circle" size="2rem" class="mr-2"></Skeleton>
            </div>
        </div>
    </div>
</template>