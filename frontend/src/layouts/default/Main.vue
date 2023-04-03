
<script setup lang="ts">
import LogTableIconDialogVue from '@/components/LogTableIconDialog.vue';
import { useActivityStore } from '@/stores/activityStore';
import { useLogStore } from '@/stores/logsStore';
import { computed, ref } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme()
const timestamp = ref('')
const setTime = setInterval(() => {
    // Concise way to format time according to system locale.
    timestamp.value = Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: 'numeric'
    }).format()
}, 1000)
const activityStore = useActivityStore()
const logStore = useLogStore()
const totalTime = computed(() => {
    const seconds = logStore.logs
        .reduce((sum, a) => sum + (a.duration ?? 0), 0)
    if (seconds < 60) return `${seconds.toFixed()} seconds`
    return `${(seconds / 60).toFixed()} minutes`
})
const setTheme = () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
const isDark = computed(() => theme.global.name.value === 'dark')
</script>
<template>
    <v-app id="main-app-wrapper">
        <v-system-bar>
            <!-- <v-icon icon="mdi-circle" class="ms-2" color="red" v-if="activityStore.active!=undefined"></v-icon> -->
            <span v-if="activityStore.active != undefined">Running... {{ activityStore.active.name }}</span>
            <v-spacer></v-spacer>
            <span class="bg-teal-lighten-4">
                <span class="px-3">Total</span>
                <span class="px-1">
                    {{ logStore.logs.length }} tasks
                </span>
                <span class="px-1">
                    {{ totalTime }}
                </span>
            </span>
            <span>
                <LogTableIconDialogVue />
            </span>
            <span class="ms-2"  @click="setTheme">
                <v-icon :icon="isDark ? 'mdi-weather-night' : 'mdi-weather-sunny'"></v-icon>
            </span>
            <span>
            </span>
            <span class="ms-2">{{ timestamp }}</span>
        </v-system-bar>
        <router-view />
    </v-app>
</template>
<style>
</style>