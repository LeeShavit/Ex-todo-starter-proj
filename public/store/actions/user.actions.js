import { userService } from '../../services/user.service.js'
import { SET_USER, SET_USER_BALANCE, UPDATE_USER } from "../reducers/user.reducer.js"
import {  store } from "../store.js"


export function login(credentials) {
    return userService.login(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch(err => {
            console.log('User actions -> Cannot login:', err)
            throw err
        })
}

export function signup(credentials) {
    return userService.signup(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch(err => {
            console.log('User actions -> Cannot signup:', err)
            throw err
        })
}


export function logout() {
    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, user: null })
        })
        .catch(err => {
            console.log('User actions -> Cannot logout:', err)
            throw err
        })
}

export function completeTodo() {
    return userService.updateBalance(10)
        .then(balance => {
            store.dispatch({ type: SET_USER_BALANCE, balance })
        })
        .catch(err => {
            console.log('User actions -> Cannot update balance:', err)
            throw err
        })
}

export function updateUser(userToSave) {
    return userService.save(userToSave)
        .then((savedUser) => {
            console.log(savedUser)
            userService.updateLoggedInUser(savedUser)
            store.dispatch({ type: UPDATE_USER, user: userService.getLoggedInUser() })
            return savedUser
        })
        .catch(err => {
            console.log('err:', err)
            throw err
        })
}
