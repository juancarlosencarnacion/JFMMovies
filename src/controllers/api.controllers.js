const ModelMovies = require('../models/movie.model')
const controllers = {}

controllers.postMovies = async (req, res) => {
    const movies = new ModelMovies(req.body)
    try {
        await movies.save()
        res.status(201).send(movies)

    } catch (error) {
        res.status(500).send({ error: error })
    }
}

controllers.getMovies = async (req, res) => {

    let movies = []
    try {
        movies = await ModelMovies.find({})
        res.send(movies)
    } catch (error) {
        res.status(500).send({ Error: error })
    }
}

controllers.getMoviesById = async (req, res) => {
    const _id = req.params.id
    try {
        const movie = await ModelMovies.findOne({ _id })

        if (!movie) {
            return res.status(404).send({ msg: 'Pelicula no encontrada' })
        }
        res.send(movie)
    } catch (error) {
        res.status(500).send(error)
    }
}

controllers.getMoviesByTitulo = async (req, res) => {
    const titulo = req.params.titulo
    try {
        const movie = await ModelMovies.findOne({ titulo })

        if (!movie) {
            return res.status(404).send({ msg: 'Pelicula no encontrada' })
        }
        res.send(movie)
    } catch (error) {
        res.status(500).send(error)
    }
}

controllers.getMoviesByCategory = async (req, res) => {
    const category = req.params.category
    try {
        const movies = await ModelMovies.find({ categoria: category })
        res.status(200).send(movies)
    } catch (error) {
        res.status(500).send(error)
    }
}

controllers.patchMovies = async (req, res) => {
    const _id = req.params.id

    const keys = Object.keys(req.body)
    const allowed = ['categoria', 'titulo', 'sinopsis', 'duracion', 'clasificacion_por_edad', 'elenco', 'director', 'año_de_lanzamiento', 'trailer', 'portada','banner' ]

    const validKeys = keys.every((element) => allowed.includes(element))

    if (!validKeys) {
        return res.status(400).send('Invalid update')
    }
    try {
        let movies = await ModelMovies.findOne({ _id })

        if (!movies) {
            res.status(404).send({ msg: 'Pelicula no encontrada' })
        }
        keys.forEach((element) => movies[element] = req.body[element])

        await movies.save()
        
        res.send(movies)
    } catch (error) {
        res.status(500).send({ Error: error })
    }
}

controllers.deleteMovie = async (req, res) => {
    const _id = req.params.id
    try {
        let movies = await ModelMovies.findOneAndDelete({ _id })
        res.status(200).send(`${movies} Pelicula eliminada correctamente`)
    } catch (error) {
        res.status(500).send({ Error: error })
    }
}

module.exports = controllers