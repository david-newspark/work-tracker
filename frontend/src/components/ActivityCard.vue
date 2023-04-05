<script setup lang="ts">
import { useActivityStore } from '@/stores/activityStore';
import { useLogStore } from '@/stores/logsStore';
import type { Activity } from '@/types/Activity';
import { useFavicon, useTitle } from '@vueuse/core';
import transform from '@/util/timeTransform'
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
    if (activityStore.active.length > 0) {
        logStore.start(activity.value.id)
        favIcon.value = 'fire-circle-custom.png'
        browserTitle.value = `${activity.value.name} | Activity Tracker`
    } else {
        favIcon.value = 'favicon.ico'
        browserTitle.value = `Activity Tracker`
    }
}
const handleRemove = () => {
    console.log('Remove', activity.value.id)
    if (activityStore.active == activity.value.id) {
        activityStore.activate(activity.value)
        logStore.stop()
    }
    activityStore.remove(activity.value)
}
const iconName = `mdi-${activity.value.icon}`
const logTime = computed(() => {
    const duration = logStore.logs.filter(l => l.activity_id == activity.value.id)
        .reduce((sum, a) => sum + (a.duration ?? 0), 0)
    return transform(duration ?? 0)
})
</script>
<template>
    <v-hover>
        <template v-slot:default="{ isHovering, props }">
            <v-container v-bind="props">
                <v-row>
                    <!-- actions -->
                    <v-col cols="2">
                        <div class="text-end" v-show="isHovering">
                            <v-btn @click="handleRemove" icon="mdi-close-circle-outline" color="red-accent-1"
                                :ripple="false"
                                variant="plain">
                            </v-btn>
                        </div>
                    </v-col>
                    <!-- activity -->
                    <v-col>
                        <v-card variant="tonal" @click="handleActivate" :color="myColor" :id="activity.id" class="pa-1"
                            :append-icon="iconName" :loading="active">
                            <v-card-text class="align-self-center h-100">
                                <h1 style="font-size:220%">{{ activity.name }}</h1>
                                {{ logTime.length.toFixed() }} {{ logTime.type }}
                                <template v-slot:append>
                                </template>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </v-hover>
</template>
<style></style>