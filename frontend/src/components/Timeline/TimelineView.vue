<script setup lang="ts">
import { computed } from 'vue';
import { useLogStore } from '@/stores/logsStore';
import { useVirtualList, useWindowSize } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useActivityStore } from '@/stores/activityStore';
import type { Activity } from '@/types/Activity';
import TimelineItem from './TimelineItem.vue';
import ConfirmDialog from '../Dialogs/ConfirmDialog.vue';
import { useDialogStore } from '@/stores/dialogStore';
const logStore = useLogStore()
const activityStore = useActivityStore()
const getById = (id: string): Activity | undefined => {
    return activityStore.activities.filter(a => a.id === id).shift()
}
const { logs, reverse } = storeToRefs(logStore)
const { list, containerProps, wrapperProps } = useVirtualList(reverse, {
    itemHeight: 38
})
const { height } = useWindowSize()
const heightStyle = computed(() => {
    const reducedH = height.value * 0.92
    return `${reducedH}px`
})

const dialogStore = useDialogStore()
const handleRemoveLog=() => {
    const log = logStore.logs.filter(l => l.id == dialogStore.logId)
    if(log == undefined) return
    if(activityStore.active == log[0].activity_id) activityStore.deactivate(log[0].activity_id)
    logStore.remove(dialogStore.logId)
    dialogStore.logId=''
}

</script>
<template>
    <div v-bind="containerProps" id="main-virtual-wrapper">
        <div v-bind="wrapperProps" id="inner-virtual-wrapper">
            <v-timeline side="end">
                <TimelineItem v-for="{ index, data } in list" :key="index" :log="data"
                    :activity="getById(data.activity_id)" />
            </v-timeline>
        </div>
    </div>
    <ConfirmDialog @do-remove="handleRemoveLog"/>
</template>
<style>
#main-virtual-wrapper {
    height: v-bind(heightStyle)
}
</style>