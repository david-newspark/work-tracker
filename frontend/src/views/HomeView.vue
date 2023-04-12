
<script setup lang="ts">
import ActivityList from '@/components/Activity/ActivityList.vue';
import TimelineView from '@/components/Timeline/TimelineView.vue';

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
  /* border-radius: 16px; */
}
</style>
