document.addEventListener('DOMContentLoaded', () => {
  obtenerPortadas()
});

const obtenerPortadas = async () => {
  const response = await fetch('http://localhost:3000/movies')
  const data = await response.json()

  let sliderInner = document.querySelector('.slider-inner')

  sliderInner.innerHTML = ''
  data.forEach((elemento) => {
    sliderInner.innerHTML += `
      <img src="${elemento.portada}" alt="Portada de ${elemento.titulo}">
    `
  })

  sliderInner.style.width = `${data.length * 100}%`

  generarSlider(sliderInner, data.length)
}

//Con esto buscamos todas las imagenes dentro de sliderInner
const generarSlider = (sliderInner, numImages) => {
  // let images = sliderInner.querySelectorAll('img')
  let index = 0

  setInterval(function () {
    let percentage = (index * -100) / numImages
    sliderInner.style.transform = 'translateX(' + percentage + '%)'
    index++
    if (index >= numImages) {
      index = 0
    }
  }, 3000)
}

// Listen for click on Sign Up link
document.getElementById('sign-up').addEventListener('click', function () {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'flex';
  // document.getElementById('register-form button').classList.add('btn-register');
});

// Listen for click on Login link in the registration form
document.getElementById('login').addEventListener('click', function () {
  document.getElementById('login-form').style.display = 'flex';
  document.getElementById('register-form').style.display = 'none';

});

//Captura de datos
async function submitForm(event) {
  event.preventDefault(); 

  const form = event.target;
  const action = form.getAttribute('action'); 
  const method = form.getAttribute('method'); 

  // Recoge los datos del formulario
  const data = new FormData(form);
  const requestData = Object.fromEntries(data);

  if (Object.keys(requestData).length > 2) {
    console.log('Registro exitoso')
  }

  try {
    // Realiza la solicitud HTTP
    const response = await fetch(action, {
      method: method,
      body: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();

    if (response.ok) {
      if (form.id === 'register-form') {
        alert('Registro exitoso');
        window.location.href = 'login.html'; 
      } else if (form.id === 'login-form') {
        window.location.href = 'agregar.html'; 
      }
    } else {
      document.getElementById('result').innerText = 'Error: ' + result.message;
    }
  } catch (error) {
    document.getElementById('result').innerText = 'Error: ' + error.message; 
  }
}


// Añade eventos de envío a los formularios
document.getElementById('login-form').addEventListener('submit', submitForm);
document.getElementById('register-form').addEventListener('submit', submitForm);
