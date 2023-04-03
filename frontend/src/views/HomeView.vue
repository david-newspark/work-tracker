
<script setup lang="ts">
import ActivitiesView from '@/components/ActivitiesView.vue';
import LogsView from '@/components/LogsView.vue';
import { useWindowSize } from '@vueuse/core';


const {width, height} = useWindowSize()

</script>

<template>
  <v-container grid-list-md class="h-screen">
    <v-row class="h-screen">
      <v-col cols="6">
        <ActivitiesView />
      </v-col>
      <v-col cols="6" style="height: height;">
        <LogsView />
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
