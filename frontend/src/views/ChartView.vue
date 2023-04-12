<script setup lang="ts">
import TotalOverview from '@/components/Charts/TotalOverview.vue';

</script>


<template>
    <v-container class="h-100">
      <v-row class="h-100">
        <v-col class="h-100 d-flex align-center">
          <v-card class="w-100">
            <v-card-text class="text-end">
              <h1>Total Time Spent...</h1>
              <total-overview />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  