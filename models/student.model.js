const mongoose = require('mongoose')
const Joi = require('joi')
require('dotenv').config()

const schemaValidation = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(20).required(),
    lastName: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    age: Joi.number().required(),
    phone: Joi.number().required()
})

//******
let schemaStudent = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
    phone: Number
})


//**********
var Student = mongoose.model('student', schemaStudent)
var url = process.env.URL

//**********
exports.testConnect = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            mongoose.disconnect()
            resolve('OK Connected')
        }).catch((err) => {
            reject(err)
        })
    })
}

//**********
exports.postNewStudent = (firstName, lastName, email, age, phone) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            //firstName(1): firstName(2)====>(1)mata3 schemaValidation w (2) mta3 al function postNewStudent 
            let validation = schemaValidation.validate({ firstName: firstName, lastName: lastName, email: email, age: age, phone: phone })
            if (validation.error) {
                mongoose.disconnect()
                    //reject(validation)
                    //reject(validation.error)
                    // reject(validation.error.details)
                reject(validation.error.details[0].message)
            }


            let student = new Student({
                firstName: firstName,
                lastName: lastName,
                email: email,
                age: age,
                phone: phone
            })
            student.save().then((doc) => {
                mongoose.disconnect()
                resolve(doc)
            }).catch((err) => {
                mongoose.disconnect()
                reject(err)
            })
        }).catch((err) => {
            reject(err)
        })
    })
}

//**********
exports.getAllStudents = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return Student.find()
        }).then((doc) => {
            mongoose.disconnect()
            resolve(doc)
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
}


//**********
exports.getOneStudent = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return Student.findById(id)
        }).then((doc) => {
            mongoose.disconnect()
            resolve(doc)
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

//**********
exports.deleteOneStudent = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return Student.deleteOne({ _id: id })
        }).then((doc) => {
            mongoose.disconnect()
            resolve(doc)
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
}


//**********
exports.updateOneStudent = (id, firstName, lastName, email, age, phone) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            //firstName(1): firstName(2)====>(1)mata3 schemaValidation w (2) mta3 al function postNewStudent 
            let validation = schemaValidation.validate({ firstName: firstName, lastName: lastName, email: email, age: age, phone: phone })
            if (validation.error) {
                mongoose.disconnect()
                    //reject(validation)
                    //reject(validation.error)
                    // reject(validation.error.details)
                reject(validation.error.details[0].message)
            }
            return Student.updateOne({ _id: id }, { firstName: firstName, lastName: lastName, email: email, age: age, phone: phone })
        }).then((doc) => {
            mongoose.disconnect()
            resolve(doc)
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
}