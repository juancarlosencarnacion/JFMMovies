const jwt = require('jsonwebtoken')
const User = require('../models/user.model')


const auth = async (req, res, next) => {
    try {
        if (req.header('Authorization')) {
            const token = req.header('Authorization').replace('Bearer ', '')
            const decode = jwt.verify(token, 'secret')
            console.log(`Informacion del token decodificada: `, decode)


            const user = await User.findOne({ _id: decode._id, 'tokens.token': token })

            if (!user) {
                throw new Error('Invalid token!')
            }

            req.token = token
            req.user = user

            next()
        } else {
            throw new Error('Falta token de validacion!')
        }
    } catch (error) {
        res.status(401).send({ error: 'usuario no autenticado!' })
    }
}
module.exports = auth