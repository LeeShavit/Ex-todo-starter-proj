import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'

const BASE_URL = '/api/todo/'

export const todoService = {
    query,
    get,
    remove,
    save,
    getEmptyTodo,
    getDefaultFilter,
    getFilterFromSearchParams,
    getImportanceStats,
}
// For Debug (easy access from console):
window.cs = todoService

function query(filterBy = {}) {
    return axios.get(BASE_URL, { params: filterBy })
        .then(res => res.data)
}

function get(todoId) {
    return axios.get(BASE_URL + todoId)
        .then(res => res.data)

}

function remove(todoId) {
    return axios.delete(BASE_URL + todoId).then(res => res.data)

}

function save(todo) {
    const method = todo._id ? 'put' : 'post'
    return axios[method](BASE_URL + todo._id || '', todo).then(res => res.data)
}

function getEmptyTodo(txt = '', importance = 5) {
    return { txt, importance, isDone: false }
}

function getDefaultFilter() {
    return { txt: '', importance: 0, status: '', sort: '', pageIdx: '' }
}

function getFilterFromSearchParams(searchParams) {
    const filterBy = {
        txt: searchParams.get('txt') || '',
        isDone: searchParams.get('isDone') || 'all',
        importance: +searchParams.get('importance') || 0,
        pageIdx: +searchParams.get('pageIdx') || 0,
        sort: searchParams.get('sort') || ''
    }
    return filterBy
}


function getImportanceStats() {
    return axios.get(BASE_URL, { params: filterBy })
        .then(res => res.data)
        .then(todos => {
            const todoCountByImportanceMap = _getTodoCountByImportanceMap(todos)
            const data = Object.keys(todoCountByImportanceMap).map(speedName => ({ title: speedName, value: todoCountByImportanceMap[speedName] }))
            return data
        })

}

function _getTodoCountByImportanceMap(todos) {
    const todoCountByImportanceMap = todos.reduce((map, todo) => {
        if (todo.importance < 3) map.low++
        else if (todo.importance < 7) map.normal++
        else map.urgent++
        return map
    }, { low: 0, normal: 0, urgent: 0 })
    return todoCountByImportanceMap
}

// function _createTodos() {
//     let todos = utilService.loadFromStorage(TODO_KEY)
//     if (!todos || !todos.length) {
//         todos = []
//         const txts = ['Learn React', 'Master CSS', 'Practice Redux']
//         for (let i = 0; i < 20; i++) {
//             const txt = txts[utilService.getRandomIntInclusive(0, txts.length - 1)]
//             todos.push(_createTodo(txt + (i + 1), utilService.getRandomIntInclusive(1, 10)))
//         }
//         utilService.saveToStorage(TODO_KEY, todos)
//     }
// }

// function _createTodo(txt, importance) {
//     const todo = getEmptyTodo(txt, importance)
//     todo._id = utilService.makeId()
//     todo.createdAt = todo.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
//     todo.color = '#fcc7fa'
//     if (utilService.getRandomIntInclusive(1, 4) === 1) todo.isDone = true
//     return todo
// }

// function _setNextPrevTodoId(todo) {
//     return storageService.query(TODO_KEY).then((todos) => {
//         const todoIdx = todos.findIndex((currTodo) => currTodo._id === todo._id)
//         const nextTodo = todos[todoIdx + 1] ? todos[todoIdx + 1] : todos[0]
//         const prevTodo = todos[todoIdx - 1] ? todos[todoIdx - 1] : todos[todos.length - 1]
//         todo.nextTodoId = nextTodo._id
//         todo.prevTodoId = prevTodo._id
//         return todo
//     })
// }


// Data Model:
// const todo = {
//     _id: "gZ6Nvy",
//     txt: "Master Redux",
//     importance: 9,
//     isDone: false,
//     createdAt: 1711472269690,
//     updatedAt: 1711472269690
// }

