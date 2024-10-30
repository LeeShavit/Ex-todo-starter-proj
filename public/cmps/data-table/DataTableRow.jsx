const { useState, Fragment } = React
const { Link } = ReactRouterDOM

export function DataTableRow({ todo, onRemoveTodo }) {

    const [isExpanded, setIsExpanded] = useState(false)

    return <Fragment>
        <tr>
            <td className="toggle-expand" onClick={() => setIsExpanded(!isExpanded)} style={{ cursor: 'pointer' }}>
                {(isExpanded) ? '-' : '+'}
            </td>
            <td>{todo._id}</td>
            <td className={(todo.isDone) ? 'text-decoration-line-through' : ''}>{todo.txt}</td>
            <td>{todo.importance}</td>
            <td className="d-flex justify-content-start"> {/* Flexbox for inline buttons */}
                <Link className="btn btn-info btn-sm me-1" to={`/todo/${todo._id}`}>Details</Link>
                <Link className="btn btn-warning btn-sm me-1" to={`/todo/edit/${todo._id}`}>Edit</Link>
                <button className="btn btn-danger btn-sm" onClick={() => onRemoveTodo(todo._id)}>Remove</button>
            </td>
        </tr>
        <tr hidden={!isExpanded}>
            <td colSpan="5" className="todo-info">
                <div className="d-flex align-items-center">
                    <img src={`https://robohash.org/${todo._id}`} alt="Todo Image" style={{ maxWidth: '50px', marginRight: '10px' }} />
                    <div>
                        <h5>{todo.txt}</h5>
                        <p>{todo.txt}s are best for lorem ipsum dolor</p>
                    </div>
                </div>
            </td>
        </tr>
    </Fragment>


}
