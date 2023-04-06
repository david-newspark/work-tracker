<script setup lang="ts">
import { useActivityStore } from '@/stores/activityStore';
import { useIconStore } from '@/stores/iconStore';
import { createActivity, type Activity } from '@/types/Activity';
import { computed, ref, type Ref } from 'vue';
const activityStore = useActivityStore()
const iconStore = useIconStore()
const show = ref(false)
const taskNameRules = [
    (name: string | undefined) => {
        if (name) return true
        return 'You must enter a task name.'
    },
    (name: string | undefined) => {
        if (alreadyActive()) return 'Already exists!'
    }
]
const taskName = ref('')
const iconName = ref('fire-circle')
const form = ref(undefined)
const displayIconName = computed(() => {
    if (iconName.value == undefined) iconName.value = 'fire-circle'
    return getIconName(iconName)
})
const getIconName = (iconValue:Ref<string>):string => {
    return iconValue.value.startsWith('mdi-') ? iconValue.value : `mdi-${iconValue.value}`
}
const addActivity = () => {
    iconName.value = iconName.value.startsWith('mdi') ? iconName.value.substring(4) : iconName.value
    console.log(`Add: ${taskName.value} ${iconName.value}`)
    let newActivity = findActivity()
    if (newActivity == undefined) {
        newActivity = createActivity({ name: taskName.value, icon: iconName.value })
    }
    newActivity.icon = iconName.value
    newActivity.removed = false
    console.log('Activity:', newActivity)
    activityStore.add(newActivity)
    show.value = false
    if (form.value != undefined) {
        form.value.reset()
    }
}
const findActivity = (): Activity | undefined => {
    return activityStore.activities.filter(a => a.name === taskName.value).shift()
}
const showForm = () => {
    if (activityStore.atMax) return;
    show.value = !show.value
}
const hideForm = () => {
    if (form.value != undefined) form.value.reset()
    show.value = false
}
const alreadyActive = (): boolean => {
    const found = findActivity()
    return found != undefined && !found.removed
}
</script>
<template>
    <v-hover>
        <template v-slot:default="{ isHovering, props }">
            <v-card variant="plain" class="mt-5" v-bind="props">
                <v-card-text class="align-self-center h-100 text-right text" @click="show ? hideForm() : showForm()">
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
                            <v-form ref="form">
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <v-text-field v-model="taskName" :rules="taskNameRules" label="Task name"
                                                required variant="underlined"></v-text-field>
                                            <v-autocomplete v-model="iconName" label="Icon name" variant="underlined"
                                                :prepend-inner-icon="displayIconName" :items="iconStore.icons">
                                                <template v-slot:item="{ props, item }">
                                                    <v-list-item v-bind="props"
                                                        :title="item.value" :prepend-icon="getIconName(item)"></v-list-item>
                                                </template>
                                            </v-autocomplete>
                                            <div class="text-end">
                                                <v-btn class="mt-2" variant="plain" @click="hideForm"><v-icon
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