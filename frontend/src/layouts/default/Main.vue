
<script setup lang="ts">
import { useActivityStore } from '@/stores/activityStore';
import { ref } from 'vue';

const timestamp = ref('')
const setTime = setInterval(() => {
    // Concise way to format time according to system locale.
    // In my case this returns "3:48:00 am"
    timestamp.value = Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: 'numeric'
    }).format()
}, 1000)
const activityStore = useActivityStore()
</script>
<template>
    <v-app id="main-app-wrapper">
        <v-system-bar>
            <!-- <v-icon icon="mdi-circle" class="ms-2" color="red" v-if="activityStore.active!=undefined"></v-icon> -->
            <span v-if="activityStore.active!=undefined">Running... {{ activityStore.active.name }}</span>
            <v-spacer></v-spacer>
            <span class="ms-2">{{ timestamp }}</span>
        </v-system-bar>
        <router-view />
    </v-app>
</template>