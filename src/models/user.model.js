const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ModelMovies = require('./movie.model')
const { validate } = require('./movie.model')


const userSchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: true,
    },
    last_name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error('Email Incorrecto!')
            }
        },
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: [8, 'Se requiere al menos 8 caracteres'],
        validate(value) {
            if(value.includes('12345678')) {
                throw new Error('Passaword no cumple las politicas de seguridad especificadas')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})



userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if(!user) {
        console.log('Usuario no encontrado')
        throw new Error('Error de Incio de Sesión')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        console.log('Contraseña incorrecta')
        throw new Error('Error de Incio de Sesión')
    }

    return user
}

userSchema.methods.generateToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'secret')

    user.tokens = user.tokens.concat( { token } )

    await user.save()

    return token
}

userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
}) 

const User = mongoose.model('users', userSchema)

module.exports = User