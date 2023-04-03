import genUniqueId from "@/util/id"

interface ActivityLog {
    id: string,
    start: number,
    stop: number | undefined,
    duration: number | undefined,
    duration_unit: string,
    activity_id: string
}

function createActivityLog(param: Omit<ActivityLog, 'id' | 'stop' | 'duration' | 'duration_unit'>): ActivityLog {
    return { 
        ...param, 
        id: genUniqueId(),
        stop: undefined,
        duration: undefined,
        duration_unit: 'seconds'
    }
}

export { createActivityLog }
export type { ActivityLog }
