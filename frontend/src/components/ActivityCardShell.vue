<script setup lang="ts">
import { useActivityStore } from '@/stores/activityStore';
import { ref } from 'vue';
const activityStore = useActivityStore()
const show = ref(false)
const taskNameRules = [
    (name: string | undefined) => {
        if (name) return true
        return 'You must enter a task name.'
    },
]
const taskName = ref('')
const iconName = ref('mdi-fire-circle')
</script>
<template>
    <v-hover>
        <template v-slot:default="{ isHovering, props }">
            <v-card variant="flat" class="mt-5" v-bind="props">
                <v-card-text class="align-self-center h-100 text-right text" @click="show = !show">
                    <h1 style="font-size:220%" class="d-inline-block">
                        <v-fade-transition>
                            <span v-show="isHovering || show">Add</span>
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
                                                :prepend-inner-icon="iconName">
                                            </v-autocomplete>
                                            <div class="text-end">
                                                <v-btn class="mt-2" variant="plain" @click="show = false"><v-icon
                                                        icon="mdi-close-circle-outline"></v-icon></v-btn>
                                                <v-btn type="submit" class="mt-2" variant="tonal">Add</v-btn>
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