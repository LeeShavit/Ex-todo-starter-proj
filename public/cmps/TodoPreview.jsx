export function TodoPreview({ todo, onToggleTodo }) {
    return (
        <React.Fragment>
            <h2 className='card-title' onClick={onToggleTodo}>
                {todo.isDone
                    ? <del>Todo: {todo.txt}</del>
                    : <span>Todo: {todo.txt}</span>
                }

            </h2>
            <h4 className="card-text">Todo Importance: {todo.importance}</h4>
        </React.Fragment>
    )
}
