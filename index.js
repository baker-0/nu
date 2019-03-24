const dotenv = require('dotenv').config()
const express = require('express')
const port = 8888
const app = express()

app.use(express.static('public'))

const {loginController, authController, testController} =
    require('./controller.js')

app.get('/login', loginController)

app.get('/auth', authController)

app.get('/test', testController)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))