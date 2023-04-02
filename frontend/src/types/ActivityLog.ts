import genUniqueId from "@/util/id"

interface ActivityLog {
    id: string,
    start: Date,
    stop: Date | undefined,
    activity_id: string
}

function createActivityLog(param: Omit<ActivityLog, 'id' | 'stop'>): ActivityLog {
    return { 
        ...param, 
        id: genUniqueId(),
        stop: undefined
    }
}

export { createActivityLog }
export type { ActivityLog }
