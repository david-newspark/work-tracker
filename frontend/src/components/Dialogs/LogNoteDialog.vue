<script setup lang="ts">
import { useDialogStore } from '@/stores/dialogStore';
import { useLogStore } from '@/stores/logsStore';
import type { Activity } from '@/types/Activity';
import type { ActivityLog } from '@/types/ActivityLog';
import { createNote, TYPES, type Note } from '@/types/Note';
import { storeToRefs } from 'pinia';
import { computed, type PropType } from 'vue';
import { ref, watch } from 'vue';

const props = defineProps({
    log: {
        type: Object as PropType<ActivityLog>,
        required: true
    },
    activity: {
        type: Object as PropType<Activity>,
        required: true
    }
})

const iconName = computed(() => {
    return `mdi-${props.activity.icon}`
})

const showDialog = ref(false)
const newMessage = ref()
const logsStore = useLogStore()
const dialogStore = useDialogStore()
const closeDialog = () => {
    showDialog.value = false
}
const upsertNote = (log_id: string | undefined, message: string) => {
    console.log(`Note: log: ${log_id} : message: ${message}`)
    if (log_id === undefined) {
        const newNote = createNote({ type: TYPES.ANY, message })
        logsStore.logNote(props.log.id, newNote)
        newMessage.value=''
    }
}
const notes = computed((): Note[] => {
    return props.log.notes.map(id => logsStore.notes.filter(n => n.id === id)[0])
})
</script>
<template>
    <v-dialog v-model="showDialog" width="50%">
        <template v-slot="{ isActive }">
            <v-card>
                <v-card-text class="text-end">
                    <v-form ref="form">
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-textarea rows="4" clearable label="Note" required :prepend-icon="iconName"
                                        v-model="newMessage"></v-textarea>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn variant="plain" @click="closeDialog" color="warn">
                        <v-icon icon="mdi-close-circle-outline" />
                    </v-btn>
                    <v-btn variant="outlined" color="success" @click="upsertNote(undefined, newMessage)">Add</v-btn>
                </v-card-actions>
                <v-card-text v-for="note in notes">{{ note.message }}</v-card-text>
            </v-card>
        </template>
        <template v-slot:activator="{ props }">
            <v-badge :content="log.notes.length" v-if="log.notes.length > 0" inline>
                <v-btn variant="plain" v-bind="props" icon="mdi-note-edit" />
            </v-badge>
            <v-btn variant="plain" v-bind="props" icon="mdi-note-edit" v-else />
        </template>
    </v-dialog>
</template>