const router = require('express').Router()
const studentModel = require('../models/student.model')
const jwt = require('jsonwebtoken')
const { application } = require('express')
require('dotenv').config()
    //**********
router.get('/', (req, res, next) => {
        res.send('Welcome DevOps')

    })
    //**************ya3tini token lel user
var privateKey = process.env.PRIVATE_KEY
verifToken = (req, res, next) => {
    let token = req.headers.authorization
    if (!token) {
        res.status(400).json({ msg: 'access rejected  -_-' })
    }
    try { //al verif tetakedli min privateKey token w min expiresIn  token
        jwt.verify(token, privateKey)
        next()
    } catch (e) {
        res.status(400).json({ msg: e })
    }

}
var secretKey = process.env.SECRET_KEY
var clientKey = process.env.CLIENT_KEY


//**********
router.post('/addstudent/:secret/:client', verifToken, (req, res, next) => {
    //b al params ou query
    if (req.params.secret == secretKey && req.params.client == clientKey) {
        studentModel.postNewStudent(req.body.firstName, req.body.lastName, req.body.email, req.body.age, req.body.phone)
            .then((doc) =>
                res.status(200).json(doc)

            ).catch((err) => {
                res.status(400).json({ Error: err })
            })
    } else {
        res.status(400).json({ Error: "-_- Send Me Secret And Client Key" })
    }
})

//**********i7awali a token al user b les informations mta3ou

router.get('/students/:secret/:client', verifToken, (req, res, next) => {
    //b al params ou query
    if (req.params.secret == secretKey && req.params.client == clientKey) {
        let token = req.headers.authorization
        let user = jwt.decode(token, { complete: true })
        studentModel.getAllStudents().then((doc) =>
            res.status(200).json({ students: doc, user: user })

        ).catch((err) => {
            res.status(400).json(err)
        })
    } else {
        res.status(400).json({ Error: "-_- Send Me Secret And Client Key" })
    }
})

//**********
router.get('/student/:id/:secret/:client', verifToken, (req, res, next) => {
        //b al params ou query
        if (req.params.secret == secretKey && req.params.client == clientKey) {
            studentModel.getOneStudent(req.params.id).then((doc) =>
                res.status(200).json(doc)

            ).catch((err) => {
                res.status(400).json(err)
            })
        } else {
            res.status(400).json({ Error: "-_- Send Me Secret And Client Key" })
        }
    })
    //**********
router.delete('/student/:id/:secret/:client', verifToken, (req, res, next) => {
    //b al params ou query
    if (req.params.secret == secretKey && req.params.client == clientKey) {
        studentModel.deleteOneStudent(req.params.id).then((doc) =>
            res.status(200).json(doc)

        ).catch((err) => {
            res.status(400).json(err)
        })
    } else {
        res.status(400).json({ Error: "-_- Send Me Secret And Client Key" })
    }
})


//**********
router.patch('/student/:id/:secret/:client', verifToken, (req, res, next) => {
    //b al params ou query
    if (req.params.secret == secretKey && req.params.client == clientKey) {
        studentModel.updateOneStudent(req.params.id, req.body.firstName, req.body.lastName, req.body.email, req.body.age, req.body.phone).then((doc) =>
            res.status(200).json(doc)

        ).catch((err) => {
            res.status(400).json(err)
        })
    } else {
        res.status(400).json({ Error: "-_- Send Me Secret And Client Key" })
    }
})


module.exports = router