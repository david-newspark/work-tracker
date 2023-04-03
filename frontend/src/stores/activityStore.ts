import { defineStore } from 'pinia'
import { createActivity, type Activity } from '@/types/Activity'

const activities: Activity[] = [
  createActivity({ name: 'Coding', icon: 'code-braces' }),
  createActivity({ name: 'Compiling', icon: '' }),
  createActivity({ name: 'Reading', icon: 'book-open' })
]

export const useActivityStore = defineStore('activities', {
  state: () => ({
    activities: activities,
    active: undefined as Activity | undefined
  }),
  actions: {
    add(activity: Activity) {
      activities.push(activity)
    },
    activate(activity: Activity) {
      if (this.active === activity) this.active = undefined
      else this.active = activity
    }
  }
})
