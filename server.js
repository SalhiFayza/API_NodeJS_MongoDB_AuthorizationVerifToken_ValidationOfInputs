const express = require('express')

const studentRoute = require('./routres/student.route')
const app = express()
const userRoute = require('./routres/user.route')
    //**************
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader('Acces-Control-Request-Method', "*")
    res.setHeader('Access-Control-Allow-Headers', "*")
    next()
})


//*******************
app.use('/', studentRoute)
    //*******************
app.use('/', userRoute)
    //*********************
app.listen(3000, () => console.log('server running in port 3000'))