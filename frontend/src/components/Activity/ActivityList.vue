<script setup lang="ts">
import { useActivityStore } from '@/stores/activityStore';
import ActivityCard from './ActivityCard.vue';
import ActivityCardShell from './ActivityCardShell.vue';

const activityStore = useActivityStore()
</script>
<template>
    <v-container class="h-100">
        <v-row dense class="h-100">
            <v-col cols="12" class="h-100">
                <v-slide-y-transition class="py-0" group tag="v-list">
                    <template v-for="(task, i) in activityStore.visible" :key="`${i}-${task.id}`">
                        <div>
                            <ActivityCard :activity="task" :active="task.id === activityStore.active" :idxKey="i+1" />
                        </div>
                    </template>
                </v-slide-y-transition>
                <ActivityCardShell />
            </v-col>
        </v-row>
    </v-container>
</template>
<style></style>