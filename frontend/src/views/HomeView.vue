
<script setup lang="ts">
import ActivityList from '@/components/ActivityList.vue';
import TimelineView from '@/components/TimelineView.vue';

</script>

<template>
  <v-container class="overflow-hidden">
    <v-row >
      <v-col cols="6" id="activities" class="fill-height">
        <ActivityList />
      </v-col>
      <v-col cols="6" id="timeline">
        <TimelineView />
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
#timeline {
  background: rgba(255, 255, 255, 0.2);
  /* border-radius: 16px; */
  box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  /* border: 1px solid rgba(255, 255, 255, 0.3); */
}
</style>
