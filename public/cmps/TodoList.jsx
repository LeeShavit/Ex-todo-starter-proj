import { TodoPreview } from "./TodoPreview.jsx"
const { Link } = ReactRouterDOM

export function TodoList({ todos, onRemoveTodo, onToggleTodo }) {

    if(todos.length === 0) return <h2> No todos to load</h2>
    return (
        <div className="container">
            <div className="row">
                
                {todos.map((todo, idx) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" key={todo._id}>
                        <div className="card" style={{ backgroundColor: todo.color }}>
                            <img src={`../assets/img/${'todo'}.png`} className="card-img-top" alt="" />
                            <div className="card-body">
                                <TodoPreview todo={todo} onToggleTodo={() => onToggleTodo(todo)} />
                                <button className="btn btn-danger me-2" onClick={() => onRemoveTodo(todo._id)}>Remove</button>
                                <Link className="btn btn-primary me-2" to={`/todo/${todo._id}`}>Details</Link>
                                <Link className="btn btn-warning" to={`/todo/edit/${todo._id}`}>Edit</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}