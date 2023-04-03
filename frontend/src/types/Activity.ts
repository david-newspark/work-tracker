import genUniqueId from "@/util/id"

interface Activity {
    id: string,
    name: string,
    icon: string
}

function createActivity(param: Omit<Activity, 'id'>): Activity {
    if(param.icon == '' || param.icon == undefined) param.icon='fire-alert'
    return { 
        ...param, 
        id: genUniqueId()
    }
}

export { createActivity }
export type { Activity }
