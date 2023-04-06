<script setup lang="ts">
import { useActivityStore } from '@/stores/activityStore';
import { useLogStore } from '@/stores/logsStore';
import type { Activity } from '@/types/Activity';
import { useFavicon, useMagicKeys, useTitle } from '@vueuse/core';
import transform from '@/util/timeTransform'
import { computed, ref, type PropType, type Ref } from 'vue';
import { useIconStore } from '@/stores/iconStore';
import { watch } from 'vue';

const props = defineProps({
    activity: {
        type: Object as PropType<Activity>,
        required: true
    },
    active: Boolean,
    idxKey: Number
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

// Key ctrl+index
const cmdKey = `Alt+${props.idxKey}`
const keys = useMagicKeys()
const mappedKey = keys[cmdKey]
watch(mappedKey, (v) => {
    if (v) {
        // console.log('Key press: ' + cmdKey, v)
        handleActivate()
    }
})

</script>
<template>
    <v-hover>
        <template v-slot:default="{ isHovering, props }">
            <v-container v-bind="props">
                <v-row>
                    <!-- actions -->
                    <v-col cols="2">
                        <div v-show="isHovering" class="text-end">
                            <v-btn variant="outlined" density="compact" disabled>{{ cmdKey }}</v-btn>
                            <v-btn @click="handleRemove" icon="mdi-close-circle-outline" color="red-accent-1"
                                :ripple="false" variant="plain">
                            </v-btn>
                        </div>
                    </v-col>
                    <!-- activity -->
                    <v-col>
                        <v-card variant="tonal" @click="handleActivate" :color="myColor" :id="activity.id" class="pa-1"
                            :append-icon="iconName" :loading="active" :class="active ? 'card-shadow' : ''">
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
<style scoped>
.card-shadow {
    box-shadow:
        0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 31.8px 33.4px rgba(0, 0, 0, 0.086),
        0 44px 80px rgba(0, 0, 0, 0.12)
}
</style>