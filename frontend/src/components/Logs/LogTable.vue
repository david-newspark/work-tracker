<script setup lang="ts">
import { useActivityStore } from '@/stores/activityStore';
import { useLogStore } from '@/stores/logsStore';
import { createActivity, type Activity } from '@/types/Activity';
import LogTableRow from './LogTableRow.vue';

const logStore = useLogStore()
const activityStore = useActivityStore()
const getById = (id: string): Activity => {
    const activity = activityStore.activities.filter(a => a.id === id).shift()
    if(activity == undefined) return createActivity({name:"Missing", icon:''})
    return activity
}
const headers = [
    {
        title: 'Id',
        align: 'start',
        sortable: false,
        key: 'id',
    },
    { title: 'Start', align: 'end', key: 'start' },
    { title: 'End', align: 'end', key: 'stop' },
    { title: 'Duration', align: 'end', key: 'duraction' },
    { title: 'DurationUnit', align: 'end', key: 'duraction_unit' },
    { title: 'ActId', align: 'end', key: 'activity_id' },
]

</script>
<template>
    <h1>Report: Activity Log</h1>
    <v-table>
        <thead>
            <tr>
                <th class="text-left">
                    Activity
                </th>
                <th class="text-left">
                    Start
                </th>
                <th class="text-left">
                    Stop
                </th>
                <th class="text-left">
                    Duration
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in logStore.reverse" :key="item.id">
                <LogTableRow :log="item" :activity="getById(item.activity_id)" />
            </tr>
        </tbody>
    </v-table>
</template>