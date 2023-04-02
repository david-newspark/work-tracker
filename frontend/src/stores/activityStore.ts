import { defineStore } from 'pinia'
import { createActivity, type Activity } from '@/types/Activity'

const activities: Activity[] = [
  createActivity({ name: 'Default - 1' }),
  createActivity({ name: 'Default - 2' }),
  createActivity({ name: 'Default - 3' })
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
