import { todoService } from '../../services/todo.service.js'
import { SET_TODOS, SET_IS_LOADING, REMOVE_TODO, UPDATE_TODO, UPDATE_TODO_PROGRESS } from "../reducers/todo.reducer.js"
import {  store } from "../store.js"


export function loadTodos() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const filterBy = { ...store.getState().todoModule.filterBy }

    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos })
            _updateTodoPercentage()
        })
        .catch(err => {
            console.log('err:', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
        })
        .catch(err => {
            console.log('err:', err)
            throw err
        })
}

export function updateTodo(todoToSave) {
    return todoService.save(todoToSave)
        .then(savedTodo => {
            store.dispatch({ type: UPDATE_TODO, todo: savedTodo })
            _updateTodoPercentage()
            return savedTodo
        })
        .catch(err => {
            console.log('err:', err)
            throw err
        })
}

function _updateTodoPercentage() {
    const todos = [...store.getState().todoModule.todos]
    let todosProgress = todos.filter( todo => todo.isDone).length / todos.length * 100
    store.dispatch({ type: UPDATE_TODO_PROGRESS, todosProgress })
}
