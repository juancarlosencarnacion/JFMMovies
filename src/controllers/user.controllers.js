
const User = require('../models/user.model')
const controllers = {}


controllers.registerUser = async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        res.status(201).send(user)
        console.log('Registro exitoso')
    } catch (error) {
        console.log('Error al registrar usuario: ',error)
        res.status(500).send(error)
    }
}

controllers.userLogin = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateToken()

        res.status(200).send({ user, token })
    }
    catch (error) {
        console.log('Error en el login: ', error)
        res.status(400).send({ message: 'Error de Incio de Sesión' })
    }
}

controllers.getUser = async (req, res) => {
    try {
        const _id = req.params.id
        if (_id !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Acceso denegado' })
        }
        const user = await User.find({ _id })
        res.status(200).json(user)
    } catch (error) {
        console.log("Error al obtener usuarios: ", error)
        res.status(500).json({ Error: error })

    }
}

controllers.getUsers = async (req, res) => {
    try {
        const user = await User.find({})
        res.status(200).json(user)
    } catch (error) {
        console.log("Error al obtener el usuario: ", error)
        res.status(500).json('Error ' + error)

    }
}

controllers.updateUser = async (req, res) => {
    const _id = req.params.id
    if (_id !== req.user._id.toString()) {
        return res.status(403).json({ error: 'Acceso denegado' })
    }
    const keys = Object.keys(req.body);
    const allowed = ['name', 'last_name', 'email', 'password'];

    const validKeys = keys.every((element) => allowed.includes(element));

    if (!validKeys) {
        return res.status(400).json({ error: 'Invalid update' });
    }
    try {
        let user = await User.findOne({ _id })

        keys.forEach((element) => user[element] = req.body[element]);
        await user.save();
        res.json(user);
    } catch (error) {
        console.log("Error al actualizar el usuario: ", error)
        res.status(500).json({ error: error.message });
    }
}

controllers.deleteUser = async (req, res) => {
    const _id = req.params.id
    if (_id !== req.user._id.toString()) {
        return res.status(403).json({ error: 'Acceso denegado' })
    }
    try {
        let user = await User.findOneAndDelete({ _id })
        res.status(200).json(`${user} Usuario eliminado correctamente`)
    } catch (error) {
        console.log("Error al eliminar el usuario: ", error)
        res.status(500).json({ Error: error })
    }
}
module.exports = controllers