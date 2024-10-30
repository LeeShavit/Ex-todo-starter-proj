import { todoService } from "../services/todo.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function TodoDetails() {

    const [todo, setTodo] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadTodo()
    }, [params.todoId])


    function loadTodo() {
        todoService.get(params.todoId)
            .then(setTodo)
            .catch(err => {
                console.error('err:', err)
                showErrorMsg('Cannot load todo')
                navigate('/todo')
            })
    }

    function onBack() {
        // If nothing to do here, better use a Link
        navigate('/todo')
        // navigate(-1)
    }

    if (!todo) return <div>Loading...</div>
    return (
        <section className="todo-details container mt-4">
            <div className="card shadow-sm p-4 bg-light">
                <h1 className={`display-6 ${(todo.isDone) ? 'text-success' : 'text-primary'}`}>
                    {todo.txt}
                </h1>
                <h2 className="mb-4">{(todo.isDone) ? 'Done!' : 'In your list'}</h2>

                <h3 className="text-muted">Importance: {todo.importance}</h3>
                <p className="mt-3">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim rem accusantium, itaque ut voluptates quo? Vitae animi maiores nisi, assumenda molestias odit provident quaerat accusamus, reprehenderit impedit, possimus est ad?
                </p>

                <button onClick={onBack} className="btn btn-secondary mt-4">Back to list</button>

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <Link to={`/todo/${todo.nextTodoId}`} className="text-primary">Next Todo</Link>
                    <span className="text-muted">|</span>
                    <Link to={`/todo/${todo.prevTodoId}`} className="text-primary">Previous Todo</Link>
                </div>
            </div>
        </section>

    )
}