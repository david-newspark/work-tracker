<script setup lang="ts">
import { useUserStateStore } from './stores/userStateStore';
import { useTheme } from 'vuetify';

const theme = useTheme()
const userStateStore = useUserStateStore()

const setTheme = () =>{
  theme.global.name.value = userStateStore.userState.theme
} 
setTheme()
</script>

<template>
  <router-view />
</template>
