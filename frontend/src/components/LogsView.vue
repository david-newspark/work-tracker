<script setup lang="ts">
import { computed } from 'vue';
import { useLogStore } from '@/stores/logsStore';
import type { ActivityLog } from '@/types/ActivityLog';
import { useVirtualList, useWindowSize } from '@vueuse/core';
const logStore = useLogStore()
const logSorted = computed((): ActivityLog[] => {
    return logStore.logs.sort((n1, n2) => n2.stop == null ? -1 : n2.start.getTime() - n1.start.getTime()) ?? []
})
const { list, containerProps, wrapperProps } = useVirtualList(logStore.logs, {
    itemHeight: 48
})
const { height } = useWindowSize()
const heightStyle = computed(() => {
    const reducedH = height.value * 0.90
    return `${reducedH}px`
})
</script>
<template>
    <div class="pa-4">
        Total Activity: {{ logSorted.length }} winH: {{ height }}
    </div>
    <div v-bind="containerProps" class="winHeight"  id="main-virtual-wrapper">
        <div v-bind="wrapperProps" id="inner-virtual-wrapper">
            <!-- <div v-for="{index, data} in list" :key="index">
                    <div style="height: 50px;">
                        {{ index }} {{ data.activity_id }} {{ data.duration }} {{ data.duration }}
                    </div>
                </div> -->
            <v-timeline>
                <v-timeline-item size="large" dot-color="red-lighten-2" v-for="{ index, data } in list" :key="index"
                    style="max-height: 50px;">
                    <template v-slot:icon>
                        <v-icon icon="mdi-vuetify" v-if="data.stop === undefined"></v-icon>
                    </template>
                    <template v-slot:opposite v-if="data.stop === undefined">
                        <span>Running...</span>
                    </template>
                    <v-template>
                        {{ data.activity_id }}
                    </v-template>
                    <div>
                        {{ data.duration }} {{ data.duration_unit }}
                    </div>
                </v-timeline-item>
            </v-timeline>
        </div>
    </div>
</template>
<style>
  .winHeight {
      height: v-bind(heightStyle)
  }
</style>