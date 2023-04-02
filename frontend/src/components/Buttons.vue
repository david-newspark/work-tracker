<script setup lang="ts">
import type { IButton, IButtonGroup } from '@inkline/inkline';
import { ref } from 'vue';
const activities = [
    {
        name: "1",
    }
    ,
    {
        name: "2",
    }
]
const activeButton = ref('')
const isActive = (name: string) => activeButton.value === name

const makeActive = (name: string) => {
    console.log("Active:", name)
    activeButton.value = name
}

</script>
<template>
    <IButtonGroup>
        <div v-for="(item, index) in activities">
            <IButton @click="makeActive(item.name)">{{ item.name }}</IButton>
        </div>
    </IButtonGroup>
</template>
<style>
.button {
    background: rgba(255, 255, 255, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
}
</style>