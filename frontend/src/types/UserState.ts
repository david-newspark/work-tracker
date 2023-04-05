import genUniqueId from "@/util/id"

export default interface UserState {
  id: string
  theme: string
}

function createUserState(param: Omit<UserState, 'id'>): UserState {
  return {
    ...param,
    id: genUniqueId()
  }
}

export {createUserState}