import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoSort } from "../cmps/TodoSort.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { SET_FILTER_BY } from "../store/reducers/todo.reducer.js"
import { loadTodos, removeTodo, updateTodo } from "../store/actions/todo.actions.js"
import { completeTodo } from "../store/actions/user.actions.js"
import { Fragment } from "react"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useDispatch, useSelector } = ReactRedux

export function TodoIndex() {

    const todos = useSelector(storeState => storeState.todoModule.todos)
    const isLoading = useSelector(storeState => storeState.todoModule.isLoading)

    const [searchParams, setSearchParams] = useSearchParams()
    const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

    const filterBy = useSelector(storeState => storeState.todoModule.filterBy)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: SET_FILTER_BY, defaultFilter })
    }, [])

    useEffect(() => {
        setSearchParams(filterBy)
        loadTodos()
            .catch(() => {
                showErrorMsg('Failed to load todos')
            })
    }, [filterBy])

    function setFilterBy(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy: { ...filterBy } })
    }

    function onRemoveTodo(todoId) {
        if (!confirm('are you sure you want to delete?')) return
        removeTodo(todoId)
            .then(() => {
                showSuccessMsg(`Todo removed successfully ${todoId}`)
            })
            .catch(() => {
                showErrorMsg('Cannot remove todo ' + todoId)
            })
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        updateTodo(todoToSave)
            .then(savedTodo => {
                showSuccessMsg(`Todo is ${(savedTodo.isDone) ? 'done' : 'back on your list'}`)
                if (todoToSave.isDone) {
                    completeTodo()
                }
            })
            .catch(err => {
                showErrorMsg('Cannot toggle todo ' + todo._id)
            })
    }

    const { importance, isDone, txt, sort } = filterBy

    return (
        <section className="todo-index container mt-5">
            <TodoFilter filterBy={{ importance, isDone, txt }} setFilterBy={setFilterBy} />
            <TodoSort filterBy={{ sort }} setFilterBy={setFilterBy}/>
            <div className="mb-4 text-end">
                <Link to="/todo/edit" className="btn btn-primary">Add Todo</Link>
            </div>
            {isLoading
                ? <img src={`../assets/img/loader.svg`} alt="" />

                : <React.Fragment>
                    <h2 className="text-center mb-4">Todos List</h2>
                    <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />

                    <hr className="my-4" />

                    <h2 className="text-center mb-4">Todos Table</h2>
                    <div className="table-responsive" style={{ width: '80%', margin: 'auto' }}>
                        <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
                    </div>
                </React.Fragment>
            }

        </section>

    )
}