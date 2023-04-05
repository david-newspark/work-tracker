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
    activities: useStorage('activities', activities, localStorage, { mergeDefaults: true }),
    active: useStorage('current-active', ''),
    max: 5
  }),
  getters: {
    atMax: (state) => {
        return state.activities.filter(a => !a.removed).length >= state.max
    },
    remaining: (state) => {
      return state.max - state.activities.length
    },
    visible: (state) => state.activities.filter(a => !a.removed || a.removed==undefined)
  },
  actions: {
    add(activity: Activity) {
      this.activities.push(activity)
    },
    activate(activity: Activity) {
      if (this.active === activity.id){
        this.active = ''
      }      
      else this.active = activity.id
    }
  }
})
