<script setup lang="ts">
import { computed } from 'vue';
import { useLogStore } from '@/stores/logsStore';
import { useVirtualList, useWindowSize } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useActivityStore } from '@/stores/activityStore';
import type { Activity } from '@/types/Activity';
import TimelineItem from './TimelineItem.vue';
const logStore = useLogStore()
const activityStore = useActivityStore()
const getById = (id: string): Activity | undefined => {
    return activityStore.activities.filter(a => a.id === id).shift()
}
const { logs, sorted } = storeToRefs(logStore)
const { list, containerProps, wrapperProps } = useVirtualList(sorted, {
    itemHeight: 48
})
const { height } = useWindowSize()
const heightStyle = computed(() => {
    const reducedH = height.value * 0.90
    return `${reducedH}px`
})

</script>
<template>
    <div v-bind="containerProps" class="winHeight" id="main-virtual-wrapper">
        <div v-bind="wrapperProps" id="inner-virtual-wrapper">
            <v-slide-y-transition class="py-0" group tag="v-list">
                <v-timeline side="end">
                    <TimelineItem v-for="{ index, data } in list" :key="index" :log="data"
                        :activity="getById(data.activity_id)" />
                </v-timeline>
            </v-slide-y-transition>
        </div>
    </div>
</template>
<style>
.winHeight {
    height: v-bind(heightStyle)
}
</style>