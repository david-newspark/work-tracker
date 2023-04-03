
<script setup lang="ts">
import ActivitiesView from '@/components/ActivitiesView.vue';
import TimelineView from '@/components/TimelineView.vue';
import { useWindowSize } from '@vueuse/core';


const {width, height} = useWindowSize()

</script>

<template>
  <v-container class="h-screen mt-10">
    <v-row class="h-screen w-screen">
      <v-col cols="6" class="fill-height">
        <ActivitiesView />
      </v-col>
      <v-col cols="6" style="height: height;">
        <TimelineView />
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
