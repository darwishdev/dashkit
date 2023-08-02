<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
</script>
<template>
    <div class="bg-card w-full p-4 mt-4 border-round">

        <div class="bg-card w-full p-4 mt-4 flex flex-column justify-content-center border-round">
            <div class="flex justify-content-center w-full">
                <Skeleton height=" 2.5rem" class="m-3 w-full">
                </Skeleton>
            </div>
        </div>
        <div class="bg-card w-full p-4 mt-4 flex flex-column justify-content-center border-round">
            <div class="flex justify-content-center w-full" v-for="i in 4" :key="i">
                <Skeleton height="2.5rem" class="m-3 w-full"></Skeleton>
            </div>
        </div>
    </div>
</template>