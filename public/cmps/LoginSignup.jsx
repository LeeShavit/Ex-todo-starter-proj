import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { login, signup } from '../store/actions/user.actions.js'


const { useState } = React

export function LoginSignup({ onSetUser }) {

    const [isSignup, setIsSignUp] = useState(false)
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())


    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onEnterCredentials(credentials)
    }


    function onEnterCredentials(credentials) {
        isSignup ? onSignup(credentials) : onLogin(credentials)
    }

    function onLogin(credentials) {
        login(credentials)
            .then(() => { showSuccessMsg('Logged in successfully') })
            .catch((err) => { showErrorMsg('Oops try again') })
    }

    function onSignup(credentials) {
        signup(credentials)
            .then(() => { showSuccessMsg('Signed in successfully') })
            .catch((err) => { showErrorMsg('Oops try again') })
    }

    return (
        <div className="login-signup py-2">
            <form className="row g-2 align-items-center justify-content-center" onSubmit={handleSubmit}>
                <div className="col-auto">
                    <div className="input-group input-group-sm">
                        <span className="input-group-text bg-white border-end-0">
                            <i className="bi bi-person"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control form-control-sm border-start-0"
                            name="username"
                            value={credentials.username}
                            placeholder="Username"
                            onChange={handleChange}
                            required
                            style={{ width: '120px' }}
                        />
                    </div>
                </div>

                <div className="col-auto">
                    <div className="input-group input-group-sm">
                        <span className="input-group-text bg-white border-end-0">
                            <i className="bi bi-lock"></i>
                        </span>
                        <input
                            type="password"
                            className="form-control form-control-sm border-start-0"
                            name="password"
                            value={credentials.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            style={{ width: '120px' }}
                        />
                    </div>
                </div>

                {isSignup && (
                    <div className="col-auto">
                        <div className="input-group input-group-sm">
                            <span className="input-group-text bg-white border-end-0">
                                <i className="bi bi-person-vcard"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control form-control-sm border-start-0"
                                name="fullname"
                                value={credentials.fullname}
                                placeholder="Full name"
                                onChange={handleChange}
                                required
                                style={{ width: '120px' }}
                            />
                        </div>
                    </div>
                )}

                <div className="col-auto">
                    <button type="submit" className="btn btn-primary btn-sm">
                        {isSignup ? (
                            <React.Fragment>
                                <i className="bi bi-person-plus me-1"></i>
                                Signup
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <i className="bi bi-box-arrow-in-right me-1"></i>
                                Login
                            </React.Fragment>
                        )}
                    </button>
                </div>

                <div className="col-auto">
                    <button
                        type="button"
                        onClick={() => setIsSignUp(!isSignup)}
                        className="btn btn-link btn-sm text-muted text-decoration-none"
                    >
                        {isSignup ? 'Already a member?' : 'New user?'}
                    </button>
                </div>
            </form>
        </div>




    )
}
