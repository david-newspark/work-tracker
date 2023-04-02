import genUniqueId from "@/util/id"

interface Activity {
    id: string,
    name: string,
}

function createActivity(param: Omit<Activity, 'id'>): Activity {
    return { 
        ...param, 
        id: genUniqueId()
    }
}

export { createActivity }
export type { Activity }
