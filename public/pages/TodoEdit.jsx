import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { updateTodo } from "../store/actions/todo.actions.js"
import { userService } from "../services/user.service.js"


const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function TodoEdit() {

    const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.todoId) loadTodo()
    }, [])

    function loadTodo() {
        todoService.get(params.todoId)
            .then(setTodoToEdit)
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setTodoToEdit(prevTodoToEdit => ({ ...prevTodoToEdit, [field]: value }))
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        updateTodo(todoToEdit)
            .then((savedTodo) => {
                navigate('/todo')
                showSuccessMsg(`Todo Saved (id: ${savedTodo._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot save todo')
                console.log('err:', err)
            })
    }

    const { txt, importance, isDone, color } = todoToEdit

    return (
        <section className="todo-edit container mt-4">
            <div className="card p-4 shadow-sm bg-light">
                <h2 className="text-center mb-4">Edit Todo</h2>
                <form onSubmit={onSaveTodo}>
                    <div className="mb-3">
                        <label htmlFor="txt" className="form-label">Text:</label>
                        <input
                            onChange={handleChange}
                            value={txt}
                            type="text"
                            name="txt"
                            id="txt"
                            className="form-control"
                            placeholder="Enter todo text"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="importance" className="form-label">Importance:</label>
                        <input
                            onChange={handleChange}
                            value={importance}
                            type="number"
                            name="importance"
                            id="importance"
                            className="form-control"
                            placeholder="Enter importance level"
                        />
                    </div>

                    <div className="mb-3 form-check">
                        <input
                            onChange={handleChange}
                            checked={isDone}
                            type="checkbox"
                            name="isDone"
                            id="isDone"
                            className="form-check-input"
                        />
                        <label htmlFor="isDone" className="form-check-label">Is Done</label>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="color" className="form-label">Color:</label>
                        <input
                            onChange={handleChange}
                            value={color}
                            type="color"
                            name="color"
                            id="color"
                            className="form-control form-control-color"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Save</button>
                </form>
            </div>
        </section>

    )
}