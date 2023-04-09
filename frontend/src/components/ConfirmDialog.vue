<script setup lang="ts">
import { useDialogStore } from '@/stores/dialogStore';
import { useLogStore } from '@/stores/logsStore';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
const showConfirm = ref(false)
const logsStore = useLogStore()
const dialogStore = useDialogStore()
const { logId } = storeToRefs(dialogStore)
const closeDialog = () => {
    showConfirm.value = false
    dialogStore.clearRemove()
}
watch(logId, () => {
    console.log('removeLog', logId)
    if (logId.value.length > 0) showConfirm.value = true
})
const doRemove = defineEmits(['do-remove'])
const removeLog = () => {
    console.log('Remove:', logId.value)
    doRemove('do-remove')
    closeDialog()
}
</script>
<template>
    <v-dialog v-model="showConfirm" width="auto">
        <template v-slot="{ isActive }">
            <v-card>
                <v-card-text class="text-end">
                    <h4>Really?</h4>
                </v-card-text>
                <v-card-actions>
                    <v-btn variant="plain" @click="closeDialog" color="warn">Nope.</v-btn>
                    <v-btn variant="outlined" color="success" @click="removeLog">Yep...</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>