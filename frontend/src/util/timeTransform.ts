import type { Activity } from "@/types/Activity"
import type { ActivityLog } from "@/types/ActivityLog"
import type { Duration } from "@/types/Duration"
import { DurationType } from "@/types/Duration"

const myTime = (activityLog:ActivityLog):string => {
    const seconds = activityLog.duration ?? 0
    if (seconds < 60) return `${seconds.toFixed()} seconds`
    if (seconds < 60 ) return `${(seconds / 60).toFixed()} minutes`
    return `${(seconds / 60).toFixed()} hours`
}

export default function timeTransform(seconds:number):Duration {
    let length = seconds
    let type = DurationType.SECONDS
    if(length > 60){ 
        length = length / 60
        type = DurationType.MINUTES
    }
    if(length > 60){ 
        length = length / 60
        type = DurationType.HOURS
    }
    return {length, type}
}

export {myTime}