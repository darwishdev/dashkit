<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
</script>
<template>
    <DataTable :value="Array(20)">
        <Column>
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
        <Column>
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
        <Column>
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
        <Column>
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
    </DataTable>
</template>