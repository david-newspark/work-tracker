<script setup lang="ts">
import { useActivityStore } from '@/stores/activityStore';
import type { Activity } from '@/types/Activity';
import { computed, reactive, ref } from 'vue';
import ActivityCard from './ActivityCard.vue';
import ActivityCardShell from './ActivityCardShell.vue';

const activityStore = useActivityStore()
const activities = reactive(activityStore.visible)
</script>
<template>
    <v-container class="h-100">
        <v-row dense class="h-100">
            <v-col cols="12" class="h-100">
                <ActivityCard :activity="item" :active="item.id === activityStore.active" v-for="item in activities"
                    class="align-stretch" />
                <ActivityCardShell />
            </v-col>
        </v-row>
    </v-container>
</template>
<style></style>