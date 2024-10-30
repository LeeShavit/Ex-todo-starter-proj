import fs from 'fs'
import { utilService } from './util.service.js'

const todos = utilService.readJsonFile('./data/todos.json')
const PAGE_SIZE = 8

export const todoService = {
    query,
    get,
    remove,
    save,
}

function query(filterBy) {
    return Promise.resolve(todos)
        .then(todos => {
            //sorting
            if (filterBy.sort === 'txt') todos.sort((a,b)=> a.txt.localeCompare(b.txt))
            if (filterBy.sort === 'importance') todos.sort((a,b)=> b.importance - a.importance)
            if (filterBy.sort === 'createdAt') todos.sort((a,b)=> b.createdAt - a.createdAt)
            //filtration
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                todos = todos.filter(todo => regExp.test(todo.title))
            }
            if (filterBy.minSeverity) todos = todos.filter(todo => todo.severity >= filterBy.minSeverity)
            if (filterBy.labels) {
                const labels = filterBy.labels.trim().toLowerCase().split(',')
                todos = todos.filter(todo => labels.some(label => todo.labels.includes(label)))
            }
            if(filterBy._id)
                todos= todos.filter(todo=> todo.creator._id === filterBy._id)
            if (filterBy.pageIdx !== undefined) {
                const startIdx = +filterBy.pageIdx * PAGE_SIZE 
                todos = todos.slice(startIdx, startIdx + PAGE_SIZE)
            }
            return todos
        })
}

function get(todoId) {
    const todo = todos.find(todo => todoId === todo._id)
    return Promise.resolve(todo)
}

function remove(todoId) {
    const idx = todos.findIndex(todo => todoId === todo._id)
    if (idx < 0) return Promise.reject('todo not fount')

    todos.splice(idx, 1)
    return _saveTodosToFile()
}

function save(todoToSave) {
    if (todoToSave._id) {
        const idx = todos.findIndex(todo => todoToSave._id === todo._id)
        if (idx < 0) return Promise.reject('todo not found')

        todos[idx] = {
            ...todos[idx],
            title: todoToSave.title,
            description: todoToSave.description,
            severity: todoToSave.severity
        }
    } else {
        todoToSave.creator = loggedInUser
        todoToSave = {
            ...todoToSave,
            _id: utilService.makeId(),
            createdAt: Date.now(),
            creator: loggedInUser
        }
        todos.unshift(todoToSave)
    }
    return _saveTodosToFile().then(() => todoToSave)
}

function _saveTodosToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(todos, null, 4)
        fs.writeFile('./data/todos.json', data, (err) => {
            if (err) return reject(err)
            resolve()
        })
    })
}