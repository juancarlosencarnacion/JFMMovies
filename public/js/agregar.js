async function submitForm(event) {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    const form = event.target;
    const action = form.getAttribute('action'); // Obtiene la URL del atributo 'action'
    const method = form.getAttribute('method'); // Obtiene el método HTTP del atributo 'method'

    // Recoge los datos del formulario
    const data = new FormData(form);
    const requestData = Object.fromEntries(data);

    try {
        // Realiza la solicitud HTTP 
        const response = await fetch(action, {
            method: method,
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert(method === 'PATCH' ? 'Película actualizada exitosamente' : 'Película agregada exitosamente')
            // alert('Registro exitoso')
            window.location.reload()
        }
        else {
            const errorText = await response.text()
            console.error('Error: ', errorText)
        }
    } catch (error) {
        document.getElementById('result').innerText = 'Error: ' + error.message; // Muestra el 
        console.log('Error: ', error.message)
    }
}
async function fetchmovies() {
    try {
        const response = await fetch('http://localhost:3000/movies/');
        const movies = await response.json();

        const tableBody = document.querySelector('#tabla #datos');
        const contador = document.querySelector('#contador');
        contador.innerText = `Peliculas registradas (${movies.length})`
        tableBody.innerHTML = ''; // Limpia la tabla antes de agregar nuevas filas

        movies.forEach(movie => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = movie._id;
            idCell.style.display = 'none'
            row.appendChild(idCell);

            const portadaCell = document.createElement('td');
            portadaCell.innerHTML = `<img class="tabla-portadas" src="${movie.portada}">`;
            row.appendChild(portadaCell);

            const tituloCell = document.createElement('td');
            tituloCell.textContent = letrasMayusculas(movie.titulo);
            row.appendChild(tituloCell);


            const categoriaCell = document.createElement('td');
            categoriaCell.textContent = letrasMayusculas(movie.categoria)
            row.appendChild(categoriaCell);

            const añoCell = document.createElement('td');
            añoCell.textContent = movie.año_de_lanzamiento;
            row.appendChild(añoCell);

            const calificacionPorEdadCell = document.createElement('td');
            calificacionPorEdadCell.textContent = movie.clasificacion_por_edad;
            row.appendChild(calificacionPorEdadCell);


            // Celda para los botones
            const actionsCell = document.createElement('td');

            // Crear botón de editar
            const editLink = document.createElement('a');
            editLink.textContent = 'Editar';
            editLink.href = '#contenedor'; // Puedes cambiar esto a la URL correspondiente si es necesario
            editLink.className = 'btn btn-edit';
            editLink.innerHTML = '<img src="../img/editar/edit.png"><p>Editar</p>'
            editLink.onclick = () => {
                editarMovie(movie)
            }; // Asume que cada movie tiene un _id único
            actionsCell.appendChild(editLink);
            // Crear botón de eliminar
            const deleteLink = document.createElement('a');
            deleteLink.textContent = 'Eliminar';
            deleteLink.href = '#'; // Puedes cambiar esto a la URL correspondiente si es necesario
            deleteLink.className = 'btn btn-delete';
            deleteLink.innerHTML = '<img src="../img/editar/delete.png"><p>Eliminar</p>'
            deleteLink.onclick = (e) => {
                e.preventDefault()
                deleteMovie(movie._id)
            }

            actionsCell.appendChild(deleteLink);

            row.appendChild(actionsCell);

            tableBody.appendChild(row);
        })
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}
function letrasMayusculas(string) {
    return string.split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
}

const deleteMovie = async (id) => {
    const url = `http://localhost:3000/movies/${id}`

    const options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    }

    try {
        const response = await fetch(url, options)
        if (response.ok) {
            window.location.reload();
        }
        else {
            console.error('Error eliminando la película')
        }

    }
    catch (error) {
        console.log('Error: ', error.message)
    }
}



const editarMovie = async (movie) => {
    document.getElementById('categoria').value = movie.categoria
    document.getElementById('titulo').value = movie.titulo
    document.getElementById('sinopsis').value = movie.sinopsis
    document.getElementById('duracion').value = movie.duracion
    document.getElementById('clasificacion_por_edad').value = movie.clasificacion_por_edad
    document.getElementById('elenco').value = movie.elenco
    document.getElementById('director').value = movie.director
    document.getElementById('año_de_lanzamiento').value = movie.año_de_lanzamiento
    document.getElementById('trailer').value = movie.trailer
    document.getElementById('portada').value = movie.portada
    document.getElementById('banner').value = movie.banner

    document.getElementById('form-title').textContent = 'Editar Pelicula'
    document.getElementById('form-btn').textContent = 'Actualizar Pelicula'

    const form = document.getElementById('movies-form')
    form.method = 'PATCH'
    form.action = `movies/${movie._id}`

    document.getElementById('result').innerText = '';
}

window.onload = fetchmovies;
document.getElementById('movies-form').addEventListener('submit', submitForm);