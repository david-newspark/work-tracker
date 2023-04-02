<script setup lang="ts">
import { useActivityStore } from '@/stores/activityStore';
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
const myColor = computed(() => props.active ? 'success' : 'secondary')

</script>
<template>
    <v-btn variant="tonal" @click="activityStore.activate(activity)" :color="myColor" :id="activity.id">
        {{ activity.name }}
    </v-btn>
</template>