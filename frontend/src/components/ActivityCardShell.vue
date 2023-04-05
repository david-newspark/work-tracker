<script setup lang="ts">
import { useActivityStore } from '@/stores/activityStore';
import { createActivity } from '@/types/Activity';
import { computed, ref } from 'vue';
const activityStore = useActivityStore()
const show = ref(false)
const taskNameRules = [
    (name: string | undefined) => {
        if (name) return true
        return 'You must enter a task name.'
    },
]
const taskName = ref('')
const iconName = ref('fire-circle')
const displayIconName = computed(() => {
    return iconName.value.startsWith('mdi-') ? iconName.value : `mdi-${iconName.value}`
})
const addActivity = () => {
    iconName.value = iconName.value.startsWith('mdi') ? iconName.value.substring(4) : iconName.value
    console.log(`Add: ${taskName.value} ${iconName.value}`)
    activityStore.add(createActivity({name:taskName.value, icon:iconName.value}))
    show.value=false
}
const showForm = () => {
    if(activityStore.atMax) return;
    show.value = !show.value
}
</script>
<template>
    <v-hover>
        <template v-slot:default="{ isHovering, props }">
            <v-card variant="flat" class="mt-5" v-bind="props">
                <v-card-text class="align-self-center h-100 text-right text" @click="showForm">
                    <h1 style="font-size:220%" class="d-inline-block">
                        <v-fade-transition>
                            <span v-show="isHovering || show" v-if="!activityStore.atMax">Add</span>
                            <span v-show="isHovering" v-if="activityStore.atMax">At Limit</span>
                        </v-fade-transition>
                    </h1>
                </v-card-text>
                <v-expand-transition>
                    <div v-show="show">
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-form>
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <v-text-field v-model="taskName" :rules="taskNameRules" label="Task name"
                                                required variant="underlined"></v-text-field>
                                            <v-autocomplete v-model="iconName" label="Icon name" variant="underlined"
                                                :prepend-inner-icon="displayIconName">
                                            </v-autocomplete>
                                            <div class="text-end">
                                                <v-btn class="mt-2" variant="plain" @click="show = false"><v-icon
                                                        icon="mdi-close-circle-outline"></v-icon></v-btn>
                                                <v-btn class="mt-2" variant="tonal" @click="addActivity">Add</v-btn>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </v-card-text>
                        <v-divider></v-divider>
                    </div>
                </v-expand-transition>
            </v-card>
        </template>
    </v-hover>
</template>
<style scoped></style>