<script setup lang="ts">
import type { Activity } from '@/types/Activity';
import type { ActivityLog } from '@/types/ActivityLog';
import { computed, type PropType } from 'vue';
const props = defineProps({
    log: {
        type: Object as PropType<ActivityLog>,
        required: true
    },
    activity: {
        type: Object as PropType<Activity | undefined>,
        required: true
    }
})
const myTime = computed(() => {
    const seconds = props.log.duration ?? 0
    if (seconds < 60) return `${seconds.toFixed()} seconds`
    return `${(seconds / 60).toFixed()} minutes`
})
</script>
<template>
    <td>{{ activity?.name }}</td>
    <td>{{ log.start.toLocaleString() }}</td>
    <td>{{ log.stop?.toLocaleString() }}</td>
    <td>{{ myTime }}</td>
</template>