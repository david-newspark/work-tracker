import { type ActivityLog, createActivityLog } from '@/types/ActivityLog'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { Note } from '@/types/Note'

export const useLogStore = defineStore('activityLogs', {
  state: () => ({
    logs: useStorage('activity-logs', [] as ActivityLog[], localStorage, { mergeDefaults: true }),
    notes: useStorage('notes', [] as Note[], localStorage, {mergeDefaults: true})
  }),
  getters: {
    reverse: (state) => state.logs.slice().reverse(),
    current: (state) => state.logs[state.logs.length - 1]
  },
  actions: {
    start(activity_id: string) {
      this.logs.push(createActivityLog({ start: new Date().getTime(), activity_id }))
    },
    stop() {
      if (this.current == undefined) return
      this.current.stop = new Date().getTime()
      this.current.duration =
        (new Date(this.current.stop).getTime() - new Date(this.current.start).getTime()) / 1000
    },
    reset() {
      console.log('Clear')
      this.logs = []
      useStorage('activity-logs', [] as ActivityLog[])
    },
    remove(logId: string) {
      const idx = this.logs.findIndex((l) => l.id === logId)
      if (idx == -1) return
      console.log("idx", idx)
      this.logs.splice(idx, 1)
    },
    logNote(logId: string, note: Note){
      console.log(`note: ${note}`)
      // upsert note
      const noteIdx = this.notes.findIndex(n => n.id === note.id)
      if(noteIdx === -1){
        this.notes.push(note)
        const idx = this.logs.findIndex((l) => l.id === logId)
        const log = this.logs[idx]
        log.notes.push(note.id)
      }
    }
  }
})
