const { useState, useEffect, useRef } = React
import { utilService } from "../services/util.service.js"


export function TodoFilter({ filterBy, setFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debouncedSetFilterRef = useRef(utilService.debounce(setFilterBy, 500))

    useEffect(() => {
        debouncedSetFilterRef.current(filterByToEdit)
    }, [filterByToEdit])

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

            default: break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        setFilterBy(filterByToEdit)
    }

    const { txt, importance, status } = filterByToEdit

    return (
        <section className="todo-filter container mt-2">
            <h2 className="text-center mb-3 text-sm">Filter Todos</h2>
            <form onSubmit={onSubmitFilter} className="p-3 border rounded shadow-sm bg-light">
                <div className="mb-2">
                    <label htmlFor="txt" className="form-label text-sm">Search by Text</label>
                    <input value={txt} onChange={handleChange} type="search" placeholder="Enter text" id="txt" name="txt" className="form-control form-control-sm" />
                </div>
                <div className="mb-2">
                    <label htmlFor="importance" className="form-label text-sm">Importance</label>
                    <input value={importance} onChange={handleChange} type="number" placeholder="Enter importance" id="importance" name="importance" className="form-control form-control-sm" />
                </div>
                <div className="mb-2">
                    <label htmlFor="status" className="form-label text-sm">Todo Status</label>
                    <select className="form-select form-select-sm" value={status} onChange={handleChange} name="status" id="status">
                        <option value="">All</option>
                        <option value="active">Active</option>
                        <option value="done">Done</option>
                    </select>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary btn-sm">Apply Filter</button>
                </div>
            </form>
        </section>

    )
}