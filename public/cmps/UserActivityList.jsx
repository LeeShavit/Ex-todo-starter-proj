
export function TodoList({ activities }) {

    return (
        <ul className="todo-list">
            {activities.map(({at,txt}, idx) =>
                <li key={idx}> {at}{txt}</li>
            )}
        </ul>
    )
}