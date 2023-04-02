<script setup lang="ts">
import { useActivityStore } from '@/stores/activityStore';
import type { Activity } from '@/types/Activity';
import { computed, reactive, ref } from 'vue';
import ActivityCard from './ActivityCard.vue';

const activityStore = useActivityStore()
const activities = reactive(activityStore.activities)
const activated = computed(() => activityStore.active?.id ?? 'none')
</script>
<template>
    <div v-for="item in activities">
        <ActivityCard :activity="item" :active="item.id === activated" />
    </div>
</template>
<style>
.button {
    background: rgba(255, 255, 255, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
}
</style>