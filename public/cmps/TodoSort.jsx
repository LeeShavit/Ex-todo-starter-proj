const { useState, useEffect } = React
import { utilService } from "../services/util.service.js"


export function TodoSort({ filterBy, setFilterBy }) {

    const [sortByToEdit, setSortByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        setFilterBy(sortByToEdit)
    }, [sortByToEdit])

    function handleChange({ target }) {
        let value = target.value

        setSortByToEdit({ sort: value })
    }

    function onSubmitSort(ev) {
        ev.preventDefault()
        setFilterBy(sortByToEdit)
    }

    return (
        <section className="todo-sort container mt-4">
            <h2 className="text-center mb-4">Sort Todos</h2>
            <form onSubmit={onSubmitSort} className="p-4 border rounded shadow-sm bg-light">
                <select className="form-select" aria-label="Default select example" onChange={handleChange}>
                    <option value='' selected></option>
                    <option value="createdAt">Creation</option>
                    <option value="txt">Text</option>
                    <option value="importance">Importance</option>
                </select>
            </form>
        </section>

    )
}