import { userService } from "../services/user.service.js"
import { utilService } from "../services/util.service.js"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM
const { useSelector } = ReactRedux
import { updateUser } from "../store/actions/user.actions.js"


export function UserDetails() {

    const params = useParams()
    const navigate = useNavigate()
    const [userToEdit, setUserToEdit] = useState(null)
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)


    useEffect(() => {
        if (!loggedInUser) navigate('/')
        loadUser()
    }, [loggedInUser])


    function loadUser() {
        userService.getById(params.userId)
            .then(setUserToEdit)
            .catch(err => {
                console.error('err:', err)
                showErrorMsg('Cannot load user')
                navigate('/')
            })
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
        if (field === 'color' || field === 'bgColor') {
            setUserToEdit(prevUserToEdit => ({ ...prevUserToEdit, prefs: { ...prevUserToEdit.prefs, [field]: value } }))
        }else{
            setUserToEdit(prevUserToEdit => ({ ...prevUserToEdit, [field]: value }))
        }
    }

    function onSaveUser(ev) {
        ev.preventDefault()
        updateUser(userToEdit)
            .then((savedUser) => {
                setUserToEdit(savedUser)
                showSuccessMsg(`User Updated (id: ${savedUser._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot update user')
                console.log('err:', err)
            })

    }

    function onBack() {
        // If nothing to do here, better use a Link
        navigate('/')
        // navigate(-1)
    }
    
    if (!userToEdit) return <div>Loading...</div>
    return (
        <section className="container py-4">
            <div className="row">
                {/* User Header */}
                <div className="col-12 mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h1 className="display-4 mb-0">Hi {loggedInUser.fullname}!</h1>
                            <small className="text-muted">{loggedInUser.updatedAt}</small>
                        </div>
                        <h2 className="h3">
                            Balance: <span className="badge bg-success">{loggedInUser.balance}</span>
                        </h2>
                    </div>
                </div>

                {/* Description */}
                <div className="col-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-text">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim rem accusantium,
                                itaque ut voluptates quo? Vitae animi maiores nisi, assumenda molestias odit
                                provident quaerat accusamus, reprehenderit impedit, possimus est ad?
                            </p>
                        </div>
                    </div>
                </div>

                {/* User Settings Form */}
                {(userToEdit._id === loggedInUser._id) && (
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-header">
                                <h3 className="h5 mb-0">User Settings</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={onSaveUser} className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor="full-name" className="form-label">Name:</label>
                                        <input
                                            onChange={handleChange}
                                            value={userToEdit.fullname}
                                            type="text"
                                            name="fullname"
                                            id="full-name"
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <label htmlFor="color" className="form-label">Text Color:</label>
                                        <input
                                            onChange={handleChange}
                                            value={userToEdit.prefs.color}
                                            type="color"
                                            name="color"
                                            id="color"
                                            className="form-control form-control-color w-100"
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <label htmlFor="bg-color" className="form-label">Background Color:</label>
                                        <input
                                            onChange={handleChange}
                                            value={userToEdit.prefs.bgColor}
                                            type="color"
                                            name="bgColor"
                                            id="bg-color"
                                            className="form-control form-control-color w-100"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary">
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Activities List */}
                        <div className="card">
                            <div className="card-header">
                                <h3 className="h5 mb-0">Recent Activities</h3>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    {loggedInUser.activities.map(({ at, txt }, idx) => (
                                        <li key={idx} className="list-group-item">
                                            <small className="text-muted">{utilService.getRelativeTime(at)}</small>
                                            <span className="ms-2">{txt}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* Return Link */}
                <div className="col-12 mt-4">
                    <Link to="/" className="btn btn-outline-secondary">
                        &larr; Return
                    </Link>
                </div>
            </div>
        </section>
    )
}