import genUniqueId from "@/util/id"

interface ActivityLog {
    id: string,
    start: number,
    stop: number | undefined,
    duration: number | undefined,
    duration_unit: string,
    activity_id: string,
    notes: string[]
}

function createActivityLog(param: Omit<ActivityLog, 'id' | 'stop' | 'duration' | 'duration_unit' | 'notes'>): ActivityLog {
    return { 
        ...param, 
        id: genUniqueId(),
        stop: undefined,
        duration: undefined,
        duration_unit: 'seconds',
        notes: []
    }
}

export { createActivityLog }
export type { ActivityLog }
