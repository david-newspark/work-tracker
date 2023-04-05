import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

const defaultList:string[] = [
    'code-braces',
    'book-open',
    'fire-circle',
    'controller',
    'calendar-check',
    'cog'
]

export const useIconStore = defineStore('icons', {
    state: () => ({
        icons: useStorage('icon-list', defaultList)
    }),
    actions: {
        add(name:string){
            if(this.icons.filter(i => i===name)) return
            this.icons.push(name)
        }
    }
})