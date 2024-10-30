const { useState } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useSelector } = ReactRedux


import { userService } from '../services/user.service.js'
import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'


export function AppHeader() {
    const navigate = useNavigate()
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const todosProgress = useSelector(storeState => storeState.todoModule.todosProgress)
    

    function onLogout() {
        logout()
            .then(() => {
                navigate('/')
                showSuccessMsg('Logged out')

            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    function getStyleFromPrefs(){
        if(loggedInUser && loggedInUser.prefs){
            return { color : loggedInUser.prefs.color , backgroundColor: loggedInUser.prefs.bgColor}
        }
        return {}
    }

    return (
        <header className="app-header shadow-sm" style={getStyleFromPrefs()}>
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom" style={getStyleFromPrefs()}>
        <div className="container">
            {/* Logo/Brand */}
            <a className="navbar-brand d-flex align-items-center" href="#">
                <img src="../assets/img/todo.png" alt="Logo" width="30" height="30" className="d-inline-block align-text-top me-2" />
                <span className="fw-bold">Todos!</span>
            </a>

            {/* Mobile Toggle */}
            <button
                className="navbar-toggler border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className={({isActive}) => `nav-link ${isActive ? 'active fw-medium' : ''}`} to="/">
                            <i className="bi bi-house-door me-1"></i>Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({isActive}) => `nav-link ${isActive ? 'active fw-medium' : ''}`} to="/about">
                            <i className="bi bi-info-circle me-1"></i>About
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({isActive}) => `nav-link ${isActive ? 'active fw-medium' : ''}`} to="/todo">
                            <i className="bi bi-check2-square me-1"></i>Todos
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({isActive}) => `nav-link ${isActive ? 'active fw-medium' : ''}`} to="/dashboard">
                            <i className="bi bi-graph-up me-1"></i>Dashboard
                        </NavLink>
                    </li>
                </ul>

                <div className="ms-auto me-3">
                    <UserMsg />
                </div>
            </div>
        </div>
    </nav>

    <div className="bg-light py-2 border-bottom">
        <div className="container">
            {loggedInUser ? (
                <div className="row align-items-center">
                    <div className="col-md-8">
                        <div className="d-flex align-items-center">
                            <Link to={`/user/${loggedInUser._id}`} className="text-decoration-none">
                                <div className="d-flex align-items-center">
                                    <div className="rounded-circle bg-primary text-white p-2 me-2" style={{width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        {loggedInUser.fullname.charAt(0)}
                                    </div>
                                    <div>
                                        <h6 className="mb-0">Hello {loggedInUser.fullname}!</h6>
                                        <small className="text-muted">Balance: ${loggedInUser.balance}</small>
                                    </div>
                                </div>
                            </Link>
                            <button onClick={onLogout} className="btn btn-outline-danger btn-sm ms-3">
                                <i className="bi bi-box-arrow-right me-1"></i>Logout
                            </button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="d-flex align-items-center">
                            <small className="text-muted me-2">Progress:</small>
                            <div className="progress flex-grow-1" style={{height: '8px'}} role="progressbar" aria-label="Todo Progress" aria-valuenow={todosProgress} aria-valuemin="0" aria-valuemax="100">
                                <div
                                    className="progress-bar bg-success"
                                    style={{ width: `${todosProgress}%` }}
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title={`${todosProgress}% Complete`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <LoginSignup />
            )}
        </div>
    </div>
</header>

    )
}
