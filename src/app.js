const express = require('express')
const cors = require('cors')
const path = require('path')

const routerMovies = require('./routes/movie.routes')
const userRouter = require('./routes/user.routes') 
const viewsRouter = require('./routes/views.routes')
require('./db/dbconnection')

const app = express()

app.use(express.json())
app.use(cors())

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

app.use('/movies',routerMovies)
app.use('/users', userRouter)
app.use('/', viewsRouter)

app.listen(3000, ()=>{
    console.log(`server running en http://localhost:3000`)
})