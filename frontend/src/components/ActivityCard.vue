<script setup lang="ts">
import { useActivityStore } from '@/stores/activityStore';
import { useLogStore } from '@/stores/logsStore';
import type { Activity } from '@/types/Activity';
import { computed, ref, type PropType, type Ref } from 'vue';

const props = defineProps({
    activity: {
        type: Object as PropType<Activity>,
        required: true
    },
    active: Boolean
})

const activity = ref(props.activity)
const activityStore = useActivityStore()
const logStore = useLogStore()
const myColor = computed(() => props.active ? 'success' : '')
const handleActivate = () => {
    activityStore.activate(activity.value)
    logStore.stop()
    if (activityStore.active != null)
        logStore.start(activity.value.id)
}
const iconName = `mdi-${activity.value.icon}`
</script>
<template>
    <v-card variant="tonal" @click="handleActivate" :color="myColor" :id="activity.id" height="90" class="d-inline"
        :prepend-icon="iconName">
        <template v-slot:title>
            {{ activity.name }}
        </template>
        <v-progress-linear indeterminate color="teal" v-if="active"></v-progress-linear>
    </v-card>
</template>