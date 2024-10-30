const { useState } = React
const { useNavigate } = ReactRouter
const { useSelector } = ReactRedux


import { userService } from '../services/user.service.js'
import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'


export function AppFooter() {
    const navigate = useNavigate()
    const todosProgress = useSelector(storeState => storeState.todoModule.todosProgress)


    return (
        <div className="progress flex-grow-1" style={{ height: '8px' }} role="progressbar" aria-label="Todo Progress" aria-valuenow={todosProgress} aria-valuemin="0" aria-valuemax="100">
            <div
                className="progress-bar bg-success"
                style={{ width: `${todosProgress}%` }}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={`${todosProgress}% Complete`}
            />
        </div>
    )
}