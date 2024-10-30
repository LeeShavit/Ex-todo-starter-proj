import { func } from "prop-types"
import { storageService } from "./async-storage.service.js"
import { utilService } from './util.service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'user'
const BASE_URL = '/api/user/'
const AUTH_URL = '/api/auth/'


export const userService = {
    getLoggedInUser,
    updateLoggedInUser,
    login,
    logout,
    signup,

    getById,
    query,
    save,
    updateBalance,
    logActivity,
    getEmptyCredentials,
}

function query() {
    return axios.get(BASE_URL)
}

function getById(userId) {
    return axios.get(BASE_URL + userId)
        .then(res => res.data)
}


function save(user) {
    const method = user._id ? 'put' : 'post'
    return axios[method](BASE_URL + user._id || '', user).then(res => res.data)
}

function updateLoggedInUser(user) {
    return _setLoggedinUser(user)
}

function updateBalance(diff) {
    const user = getLoggedInUser()
    if (!user) return Promise.reject('Not logged in')
    return getById(user._id)
        .then(user => {
            user.balance += diff
            save(user)
            _setLoggedinUser(user)
            return user.balance
        })
}

function logActivity(txt) {
    const { _id } = getLoggedInUser()
    if (!_id) return Promise.reject('Not logged in')
    return getById(_id)
        .then(user => {
            if (!user.activities) user.activities = []
            user.activities.push({ txt, at: Date.now() })
            save(user)
        })
}

//Authentication
function login({ username, password }) {
    return axios.post(AUTH_URL + 'login', { username, password })
        .then(res => res.data)
        .then(user => {
            _setLoggedinUser(user)
            return user
        })
}

function signup({ username, password, fullname }) {
    return axios.post(AUTH_URL + 'signup', { username, password, fullname })
        .then(res => res.data)
        .then(user => {
            _setLoggedinUser(user)
            return user
        })
}

function logout() {
    return axios.get(AUTH_URL + 'logout')
        .then(() => sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, balance: user.balance, prefs: user.prefs, activities: user.activities }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        fullname: 'Admin',
        username: 'admin',
        password: 'admin',
    }
}

// function _createUsers() {
//     let users = utilService.loadFromStorage(STORAGE_KEY)
//     if (!users || !users.length) {
//         users = []
//         const fullnames = ["Liam Stein", "Olivia Rodrigo", "Ethan Gabbay", "Ava Max", "Noah Simon"]
//         for (let i = 0; i < 10; i++) {
//             const fullname = fullnames[utilService.getRandomIntInclusive(0, 4)]
//             users.push(_createUser(fullname))
//         }
//         users.push(_createUser('Admin'))
//         utilService.saveToStorage(STORAGE_KEY, users)
//     }
// }

// function _createUser(fullname) {
//     const user = {
//         _id: utilService.makeId(),
//         username: fullname.toLowerCase().replace(' ', ''),
//         password: fullname.toLowerCase().substring(0, 2) + utilService.getRandomIntInclusive(10, 200),
//         fullname,
//         createdAt: Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24),
//         updatedAt: Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24),
//     }
//     if (fullname === 'Admin') {
//         user.username = user.password = 'admin'
//     }
//     user.balance = utilService.getRandomIntInclusive(10, 20) * 1000
//     user.activities = [{ txt: 'sign up', at: user.createdAt }]
//     user.prefs = { color: '#000000', bgColor: '#ffffff' }
//     return user
// }

// signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// login({username: 'muki', password: 'muki1'})

// Data Model:
// const user = {
//     _id: "KAtTl",
//     username: "muki",
//     password: "muki1",
//     fullname: "Muki Ja",
//     createdAt: 1711490430252,
//     updatedAt: 1711490430999
// }