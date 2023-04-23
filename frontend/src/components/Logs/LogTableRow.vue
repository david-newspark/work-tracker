<script setup lang="ts">
import type { Activity } from '@/types/Activity';
import type { ActivityLog } from '@/types/ActivityLog';
import { computed, type PropType } from 'vue';
import LogNoteDialog from '../Dialogs/LogNoteDialog.vue';
const props = defineProps({
    log: {
        type: Object as PropType<ActivityLog>,
        required: true
    },
    activity: {
        type: Object as PropType<Activity>,
        required: true
    }
})
const myTime = computed(() => {
    const seconds = props.log.duration ?? 0
    if (seconds < 60) return `${seconds.toFixed()} seconds`
    return `${(seconds / 60).toFixed()} minutes`
})
const iconName = computed(() => {
    return `mdi-${props.activity.icon}`
})
</script>
<template>
    <td><v-icon :icon="iconName" /></td>
    <td>{{ activity.name }}</td>
    <td>{{ new Date(log.start).toLocaleString() }}</td>
    <td>{{ log.stop != null ? new Date(log.stop).toLocaleString() : '' }}</td>
    <td>{{ myTime }}</td>
    <td>
        <LogNoteDialog :log="log" :activity="activity" v-if="log.stop != undefined" />
    </td>
</template>