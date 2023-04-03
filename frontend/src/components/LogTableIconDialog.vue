<script setup lang="ts">
import { ref } from 'vue';
import LogTable from '@/components/LogTable.vue';

const dialog = ref(false)
</script>
<template>
    <div class="text-center">
        <v-btn variant="text" :ripple="false">
            <v-icon icon="mdi-clipboard-text-outline"></v-icon>
            <v-dialog v-model="dialog" activator="parent" width="auto">
                <v-card>
                    <v-card-text>
                        <LogTable />
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-btn>
    </div>
</template>