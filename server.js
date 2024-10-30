import express from 'express'
import cookieParser from 'cookie-parser'
import { todoService } from './services/todo.service.js'
import { userService } from './services/user.service.js'
import { loggerService } from "./services/logger.service.js"


const app = express()
const PORT = process.env.PORT || 3030

app.listen(PORT, () => console.log(`Server ready at port ${PORT}`))

//express configuration
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

//express routing for todos:
//read list
app.get('/api/todo', ({ query }, res) => {
    const filterBy = { txt: query.txt || '', importance: +query.importance || 0, status: query.status || '', pageIdx: query.pageIdx || '', sort: query.sort || '' }
    todoService.query(filterBy)
        .then(todos => res.send(todos))
        .catch(err => {
            loggerService.error('Cannot find todos', err)
            res.status(500).send('Cannot find todos')
        })
})

//create
app.post('/api/todo/', (req, res) => {
    const loggedInUser = userService.validateToken(req.cookies.loginToken)
    if (!loggedInUser) return res.status(401).send('Cannot create todo')

    const todoToSave = {
        ...req.body,
        importance: +req.body.importance,
        balance: +req.body.balance,
    }
    todoService.save(todoToSave, loggedInUser)
        .then(todo => res.send(todo))
        .catch(err => {
            loggerService.error('Cannot create todo', err)
            res.status(500).send('Cannot create todo')
        })
})

//update
app.put('/api/todo/:todoId', (req, res) => {
    const loggedInUser = userService.validateToken(req.cookies.loginToken)
    if (!loggedInUser) return res.status(401).send('Cannot remove todo')

    const todoToSave = {
        ...req.body,
        importance: +req.body.importance,
        balance: +req.body.balance,
        createdAt: +req.body.createdAt
    }
    todoService.save(todoToSave, loggedInUser)
        .then(todo => res.send(todo))
        .catch(err => {
            loggerService.error('Cannot save todo', err)
            res.status(500).send('Cannot Save todo')
        })
})

//read item
app.get('/api/todo/:todoId', (req, res) => {
    const { todoId } = req.params
    todoService.get(todoId)
        .then(todo => res.send(todo))
        .catch(err => {
            loggerService.error('Cannot find todo', err)
            res.status(500).send('Cannot find todo')
        })
})

//delete
app.delete('/api/todo/:todoId', (req, res) => {
    const loggedInUser = userService.validateToken(req.cookies.loginToken)
    if (!loggedInUser) return res.status(401).send('Cannot remove todo')

    const { todoId } = req.params
    todoService.remove(todoId)
        .then(() => res.send(`todo ${todoId} removed successfully`))
        .catch(err => {
            loggerService.error('Cannot remove todo', err)
            res.status(500).send('Cannot remove todo')
        })
})

//express routing for Users

// get user
app.get('/api/user/:userId', (req, res) => {
    const { userId } = req.params
    console.log(req.params)
    userService.get(userId)
        .then(user => res.send(user))
        .catch(err => {
            loggerService.error('Cannot find user', err)
            res.status(400).send('Cannot find user')
        })
})

//create
app.post('/api/user/', (req, res) => {
    const userToSave = { ...req.body, severity: +req.body.severity }
    todoService.save(userToSave)
        .then(user => res.send(user))
        .catch(err => {
            loggerService.error('Cannot create user', err)
            res.status(500).send('Cannot create user')
        })
})

//update
app.put('/api/user/:userId', (req, res) => {
    const loggedInUser = userService.validateToken(req.cookies.loginToken)
    if (!loggedInUser) return res.status(401).send('Cannot update user')

    const userToSave = { ...req.body }
    userService.save(userToSave)
        .then(user => res.send(user))
        .catch(err => {
            loggerService.error('Cannot save user', err)
            res.status(500).send('Cannot Save user')
        })
})

//Authentication API
//signUp
app.post('/api/auth/signup', (req, res) => {
    const userToSave = req.body

    userService.save(userToSave)
        .then(user => {
            res.cookie('loginToken', userService.getLoginToken(user))
            res.send(user)
        })
        .catch(err => {
            loggerService.error('Cannot signup', err)
            res.status(400).send('Cannot signup')
        })
})

//login
app.post('/api/auth/login', (req, res) => {
    const credentials = req.body
    userService.checkLogin(credentials)
        .then(user => {
            if (user) {
                res.cookie('loginToken', userService.getLoginToken(user))
                res.send(user)
            } else {
                res.status(401).send('Invalid credentials')
            }
        })
})

app.get('/api/auth/logout', (req, res) => {
    res.clearCookie('loginToken')
    res.send('Logged Out')
})