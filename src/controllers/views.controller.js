const path = require('path');
const controllers = {}

controllers.login = (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html', 'login.html'));
}

controllers.index = (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html', 'index.html'));
}

controllers.detalles = (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html', 'detalles.html'));
}

controllers.agregar = (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html', 'agregar.html'));
}
module.exports = controllers