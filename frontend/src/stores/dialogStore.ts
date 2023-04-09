import { defineStore } from "pinia"

export const useDialogStore = defineStore('dialogs', {
    state: () => ({
        logId: ''
    }),
    actions: {
        showRemoveLog(log_id:string){
            console.log('showRemoveLog', log_id)
            this.logId=log_id
        },
        clearRemove(){
            this.logId=''
        }
    }
})