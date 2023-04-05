import genUniqueId from "@/util/id"

interface Activity {
    id: string,
    name: string,
    icon: string,
    removed: boolean
}

function createActivity(param: Omit<Activity, 'id' | 'removed'>): Activity {
    if(param.icon == '' || param.icon == undefined) param.icon='fire-alert'
    return { 
        ...param, 
        id: genUniqueId(),
        removed: false
    }
}

export { createActivity }
export type { Activity }
