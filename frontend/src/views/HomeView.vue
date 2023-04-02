
import type ButtonsVue from '@/components/Buttons.vue';

<template>
  <div class="about">
    <Buttons />
  </div>
</template>
<script setup lang="ts">
import Buttons from '@/components/Buttons.vue'
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
