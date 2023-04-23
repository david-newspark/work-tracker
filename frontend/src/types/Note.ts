import genUniqueId from "@/util/id"

const TYPES = {
    ANY:'any'
}

interface Note {
    id: string,
    type: string,
    message: string
}

function createNote(param: Omit<Note, 'id'>): Note {
    return { 
        ...param, 
        id: genUniqueId()
    }
}

export { createNote, TYPES }
export type { Note }