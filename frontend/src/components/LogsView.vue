<script setup lang="ts">
import { useLogStore } from '@/stores/logsStore';
const logStore = useLogStore()
</script>
<template>
    <VCard>
        <VCardTitle>Logs</VCardTitle>
        <VCardItem v-for="(log,index) in logStore.logs">
            {{ index }} {{ log }}
        </VCardItem>
    </VCard>
</template>