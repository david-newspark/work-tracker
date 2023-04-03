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
        <div class="ma-16">
            <ActivityCard :activity="item" :active="item.id === activated" v-for="item in activities" />
        </div>
</template>
<style></style>