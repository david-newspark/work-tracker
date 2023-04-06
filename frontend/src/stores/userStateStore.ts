import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { createUserState } from '@/types/UserState'
import type UserState from '@/types/UserState'

const defaultState:UserState = createUserState({theme:'light'})

export const useUserStateStore = defineStore('userState', {
    state: () => ({
        userState: useStorage('user-state', defaultState)
    })
})