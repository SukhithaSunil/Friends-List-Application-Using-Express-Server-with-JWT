const express = require('express')
const routes = require('./router/friends.js')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const app = new express()
app.use(express.json())
app.use(session({ secret: "fingerpint", resave: true, saveUninitialized: true }));
// Middleware to authenticate requests to "/friends" endpoint

app.use('/friends', (req, res, next) => {
    if (req.session.authorization) {
        let token = req.session.authorization['accessToken']
        jwt.verify(token, 'access', (err, user) => {
            if (!err) {
                req.user = user;
                next(); // Proceed to the next middleware
            }
            else {
                return res.status(403).json({ message: "User not authenticated" });
            }
        })
    }
    else {
        return res.status(403).json({ message: "User not logged in" });
    }
})

const users = []

app.post('/register', (req, res) => {
    const name = req.body.userName
    const password = req.body.password
    if (name && password) {
        isUserExists = users.filter((user) => name === user.userName)
        if (isUserExists.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }
        else {
            users.push({ userName: name, password })
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        }
    }
    else {
        return res.status(208).json({ message: "Check username and password" });
    }
})

app.post('/login', (req, res) => {
    const name = req.body.userName
    const password = req.body.password
    if (name && password) {
        isUserExists = users.filter((user) => name === user.userName)
        console.log(isUserExists)
        if (isUserExists.length < 1) {
            return res.status(400).json({ message: "User doesn't exists" });
        }
        else {
            let accessToken = jwt.sign({ data: password }, 'access', { expiresIn: 60 * 60 })
            req.session['authorization'] = { accessToken, userName:name }
            return res.status(200).json({ message: "User successfully loged in" });
        }
    }
    else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
})

app.use("/friends", routes);

app.listen(3000, (req, res) => {
    console.log("listening at 3000")
})
