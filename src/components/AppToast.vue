<script  lang="ts" setup>
import Toast from 'primevue/toast';
</script>
<template>
        <toast>
            <template #message="slotProps">
                <div class="flex toast-inner flex-column align-items-center" style="flex: 1">
                    <div class="text-center">
                        <h1 class="font-bold text-4xl ">{{ slotProps.message.summary }}</h1>
                        <p class="my-1">{{ slotProps.message.detail }}</p>
                    </div>

                </div>
            </template>
        </toast>
</template>
