import { DataTableRow } from "./DataTableRow.jsx"

export function DataTable({ todos, onRemoveTodo }) {
    return <table className="table table-striped table-bordered table-hover">
    <thead className="table-dark">
        <tr>
            <th style={{ width: '1em' }}>&nbsp;</th>
            <th style={{ width: '5em' }}>Id</th>
            <th>Text</th>
            <th>Importance</th>
            <th style={{ width: '15em' }}>Actions</th>
        </tr>
    </thead>
    <tbody>
        {todos.map(todo => (
            <DataTableRow key={todo._id} todo={todo} onRemoveTodo={onRemoveTodo} />
        ))}
    </tbody>
</table>

}
