import { defineStore } from 'pinia'
import { createActivity, type Activity } from '@/types/Activity'
import { useStorage } from '@vueuse/core'

const activities: Activity[] = [
  createActivity({ name: 'Coding', icon: 'code-braces' }),
  createActivity({ name: 'Compiling', icon: '' }),
  createActivity({ name: 'Reading', icon: 'book-open' })
]

export const useActivityStore = defineStore('activities', {
  state: () => ({
    activities: useStorage('activities', activities),
    active: useStorage('current-active', '')
  }),
  actions: {
    add(activity: Activity) {
      activities.push(activity)
    },
    activate(activity: Activity) {
      if (this.active === activity.id){
        this.active = ''
      }      
      else this.active = activity.id
    }
  }
})
