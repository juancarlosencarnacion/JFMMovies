const mongoose = require('mongoose')


const database = 'pelisApp'
const url = `mongodb+srv://fencarnacion1505:Francis1234_@cluster0.4ytiagc.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`

const dbconnection = async () => {
    try {
        await mongoose.connect(url)
        console.log(`conectado a la base de datos`)
    } catch (error) {
        console.log("Error al conectar la base de datos: " + error)
    }
}
dbconnection()
module.exports = mongoose