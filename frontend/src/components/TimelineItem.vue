<script setup lang="ts">
import type { Activity } from '@/types/Activity';
import type { ActivityLog } from '@/types/ActivityLog';
import { computed, type PropType } from 'vue';
import transform from '@/util/timeTransform'

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

const getDotColor = (item: ActivityLog) => {
    if (item.duration == undefined || item.stop == undefined || item.stop == 0) return "red-lighten-2"
    const timeFromNow = new Date().getTime() - new Date(item.stop).getTime()
    if (timeFromNow < (1000 * 60 * 5)) return "orange-lighten-3"
    return "green-lighten-2"
}
const logTime = computed(() => transform(props.log.duration ?? 0))
</script>
<template>
    <v-hover>
        <template v-slot:default="{ isHovering, props }">
            <v-timeline-item size="large" :dot-color="getDotColor(log)" v-bind="props">
                <template v-slot:icon>
                    <v-icon>
                        mdi-{{ activity?.icon }}
                    </v-icon>
                </template>
                <div>
                    <h4>
                        {{ activity?.name }}
                    </h4>
                    <span v-if="log.stop != undefined">
                        {{ logTime.length.toFixed(1) }} {{ logTime.type }}
                    </span>
                </div>
            </v-timeline-item>
        </template>
    </v-hover>
</template>

<style scoped>
#mini {
    font-size: 70%;
    height: 100%;
}
</style>