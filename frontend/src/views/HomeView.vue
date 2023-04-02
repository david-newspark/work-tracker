
import type ButtonsVue from '@/components/Buttons.vue';

<template>
  <div class="about">
    <div>Activities
      <ActivitiesView />

    </div>
    <div>
      <LogsView />
    </div>
  </div>
</template>
<script setup lang="ts">
import ActivitiesView from '@/components/ActivitiesView.vue';
import LogsView from '@/components/LogsView.vue';
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
