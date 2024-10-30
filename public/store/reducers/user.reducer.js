import { userService } from "../../services/user.service.js"

export const SET_USER = 'SET_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'
export const UPDATE_USER = 'UPDATE_USER'

const initialState = {
    loggedInUser: userService.getLoggedInUser(),
}

export function userReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_USER: return {
            ...state,
            loggedInUser: cmd.user
        }
        case SET_USER_BALANCE: return {
            ...state,
            loggedInUser: { ...state.loggedInUser, balance: cmd.balance }
        }
        case UPDATE_USER: return {
            ...state,
            loggedInUser: {...state.user ,...cmd.user}
        }
        default: return state
    }
}