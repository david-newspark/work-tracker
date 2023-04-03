<script setup lang="ts">
import { useActivityStore } from '@/stores/activityStore';
import { useLogStore } from '@/stores/logsStore';
import type { Activity } from '@/types/Activity';
import { useFavicon, useTitle } from '@vueuse/core';
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
const favIcon = useFavicon()
const browserTitle = useTitle()
const myColor = computed(() => props.active ? 'success' : '')
const handleActivate = () => {
    activityStore.activate(activity.value)
    logStore.stop()
    if (activityStore.active != null){
        logStore.start(activity.value.id)
        favIcon.value = 'fire-circle-custom.png'
        browserTitle.value = `${activity.value.name} | Activity Tracker`
    } else {
        favIcon.value='favicon.ico'
        browserTitle.value = `Activity Tracker`
    }
}
const iconName = `mdi-${activity.value.icon}`
const expand = ref(false)
const myTime = computed(() => {
    const seconds = logStore.logs.filter(l => l.activity_id==activity.value.id)
    .reduce((sum, a) => sum + (a.duration ?? 0), 0)
    if (seconds < 60) return `${seconds.toFixed()} seconds`
    return `${(seconds / 60).toFixed()} minutes`
})
</script>
<template>
    <v-card variant="tonal" @click="handleActivate" :color="myColor" :id="activity.id" class="mt-5"
        :append-icon="iconName" :loading="active">
        <v-card-text class="align-self-center h-100">
            <h1 style="font-size:220%">{{ activity.name }}</h1>
            {{ myTime }}
            <template v-slot:append>
            </template>
        </v-card-text>
    </v-card>
</template>
<style></style>