
<script setup lang="ts">
import { inject } from "vue";

const dialogRef = inject("dialogRef") as any;

const closeDialog = (e: any) => {
    dialogRef.value.close(e);
};
</script>
<template>
    <Button type="button" label="No" icon="pi pi-times" @click="closeDialog({ confirmed: false })" text></Button>
    <Button type="button" label="Yes" icon="pi pi-check" @click="closeDialog({ confirmed: true })" autofocus></Button>
</template>
