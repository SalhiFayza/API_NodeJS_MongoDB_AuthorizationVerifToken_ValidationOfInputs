const routeModel = require('../models/user.model')

const router = require('express').Router()


router.post('/register', (req, res, next) => {
    routeModel.register(req.body.userName, req.body.email, req.body.password).then((user) => {
        res.status(200).json({ user: user, Message: 'Ok Added !' })
    }).catch((err) => {
        res.status(400).json({ Error: err })
    })
})

router.post('/login', (req, res, next) => {
    routeModel.login(req.body.email, req.body.password).then((jwt) => {
        res.status(200).json({ jwt: jwt })
    }).catch((err) => {
        res.status(400).json({ Error: err })
    })
})

module.exports = router