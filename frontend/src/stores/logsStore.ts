import { type ActivityLog, createActivityLog } from '@/types/ActivityLog'
import { defineStore } from 'pinia'

export const useLogStore = defineStore('activityLogs', {
  state: () => ({
    logs: [] as Array<ActivityLog>,
    current: undefined as ActivityLog | undefined
  }),
  actions: {
    start(activity_id: string) {
      this.current = createActivityLog({ start: new Date(), activity_id })
      this.logs.push(this.current)
    },
    stop() {
      if (this.current == undefined) return
      this.current.stop = new Date()
      this.current = undefined
    }
  }
})