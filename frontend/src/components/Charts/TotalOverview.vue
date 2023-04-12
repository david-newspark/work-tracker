<script setup lang="ts">
import { useActivityStore } from '@/stores/activityStore';
import { useLogStore } from '@/stores/logsStore';
import { computed } from 'vue';
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import timeTransform from '@/util/timeTransform';

ChartJS.register(ArcElement, Tooltip)

const activityStore = useActivityStore()
const logStore = useLogStore()
const getSum = (activity_id: string):number => {
   return logStore.logs
        .filter(l => l.activity_id === activity_id)
        .reduce((s, l) => {
            const dur = l.duration ?? 0
            return s + dur
        }, 0)
}
const activityData = computed(():number[] => {
    return activityStore.activities.map(a => timeTransform(getSum(a.id)).length)
})
const labels = computed(() => activityStore.activities.map(a => a.name))
const chartData = {
    labels: labels.value,
    datasets: [
        {
            backgroundColor: ['#f87979', '#183975'],
            data: activityData.value
        }
    ]
}
</script>
<template>
    <Doughnut :data="chartData" id="totalData"></Doughnut>
</template>