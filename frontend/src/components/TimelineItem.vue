<script setup lang="ts">
import type { Activity } from '@/types/Activity';
import type { ActivityLog } from '@/types/ActivityLog';
import type { PropType } from 'vue';

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
    if (item.duration == undefined) return "red-lighten-2"
    const timeFromNow = new Date().getTime() - item.start.getTime()
    if (timeFromNow < (1000 * 60 * 5)) return "orange-lighten-3"
    return "green-lighten-2"
}
</script>
<template>
    <v-timeline-item size="large" :dot-color="getDotColor(log)">
        <template v-slot:icon>
            <v-icon>
                mdi-{{ activity?.icon }}
            </v-icon>
        </template>
        <div>
            <h4>
                {{ activity?.name }}
            </h4>
            {{ log.duration }} <span v-if="log.stop != undefined"> {{ log.duration_unit }} </span>
        </div>
    </v-timeline-item>
</template>