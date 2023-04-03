import { type ActivityLog, createActivityLog } from '@/types/ActivityLog'
import { defineStore } from 'pinia'

export const useLogStore = defineStore('activityLogs', {
  state: () => ({
    logs: [] as Array<ActivityLog>,
    current: undefined as ActivityLog | undefined
  }),
  getters: {
    sorted:(state) => state.logs.sort((n1, n2) => n2.stop == null ? -1 : n2.start.getTime() - n1.start.getTime())
  },
  actions: {
    start(activity_id: string) {
      this.current = createActivityLog({ start: new Date(), activity_id })
      this.logs.push(this.current)
    },
    stop() {
      if (this.current == undefined) return
      this.current.stop = new Date()
      this.current.duration = (this.current.stop.getTime() - this.current.start.getTime()) / 1000
      this.current = undefined
    }
  }
})
