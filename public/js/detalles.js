const currentUrl = window.location.href;
const url = new URL(currentUrl);
const queryParams = url.searchParams;
const idPelicula = queryParams.get('id')


const insertarElementos = (movie) => {
document.title = letrasMayusculas(movie.titulo);

document.getElementById("name").textContent = letrasMayusculas(movie.titulo)
document.getElementById("synopsis").textContent = letrasMayusculas(movie.sinopsis)
document.getElementById("category").innerHTML = `<span class="bold">Categoría: </span><span class="capitalize">${movie.categoria}</span>`
document.getElementById("duration").innerHTML = `<span class="bold">Duración: </span>${movie.duracion}`
document.getElementById("rating").innerHTML = `<span class="bold">Clasificación por edad: </span>${movie.clasificacion_por_edad}`
document.getElementById("cast").innerHTML = `<span class="bold">Elenco: </span>${movie.elenco.join( ", ")}`
document.getElementById("director").innerHTML = `<span class="bold">Director: </span>${movie.director}`
document.getElementById("year").innerHTML = `<span class="bold">Año de lanzamiento: </span>${movie.año_de_lanzamiento}`
document.getElementById("poster").src = movie.portada
document.getElementById("trailer").src = movie.trailer
document.getElementById("breadcrumb-area").style.backgroundImage = `url('${movie.banner}')`

traerPeliculasRecomendadas(movie.categoria);
}

const traerPeliculasRecomendadas = async (categoria) => {
  const url = `http://localhost:3000/movies/category/${categoria}`;
  const response = await fetch(url);
  const movies = await response.json();
  console.log('Películas recomendadas:', movies);
  mostrarPeliculasRecomendadas(movies);
};

const mostrarPeliculasRecomendadas = (movies) => {
  const recommendedMoviesList = document.querySelector('.movie-list');
  recommendedMoviesList.innerHTML = ''; 

  movies.forEach(movie => {
      const movieItem = document.createElement('div');
      movieItem.className = 'movie-item';
      movieItem.innerHTML = `
          <img src="${movie.portada}" alt="Portada de la película recomendada">
          <p><span class="bold">${movie.titulo}</span></p>
          <p><span class="bold">${movie.duracion}</span></p>
          <p><span class="bold">Categoria: </span>${movie.categoria}</p>
      `;
      movieItem.addEventListener('click', () => {
          window.location.href = `detalles.html?id=${movie._id}`; 
      });
      recommendedMoviesList.appendChild(movieItem);
  });
};

const obtenerDatos = async () => { 
  // const url = "http://localhost:3000/movies/66a16a66f8d3ab06537c865d"
  const url = `http://localhost:3000/movies/${idPelicula}`
  const response = await fetch(url)
  const movie = await response.json()
  console.log(movie)
  insertarElementos(movie)
};

obtenerDatos();

function letrasMayusculas(string) {
  return string.split(' ').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
}
