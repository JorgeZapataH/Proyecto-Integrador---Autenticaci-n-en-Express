const express = require ('express');
const app = express();
const PORT = 3000;
const middlewares = require('./middlewares');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; // Obten el secreto del archivo .env
// Lista de tareas como objetos
// Usuarios predefinidos en un array (esto puede ser reemplazado por una base de datos real)
const usuarios = [
  { id: 1, username: 'usuario1', password: 'contrasena1' },
  { id: 2, username: 'usuario2', password: 'contrasena2' },
];

// Ruta /login con el método POST para autenticación
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verifica si el usuario y la contraseña coinciden con los usuarios predefinidos
  const usuario = usuarios.find(
    (user) => user.username === username && user.password === password
  );

  if (!usuario) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  // Genera un token JWT con el ID del usuario
  const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

// Middleware para validar el token JWT en las rutas protegidas
const validarToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido' });
  }
};

// Ruta protegida
app.get('/ruta-protegida', validarToken, (req, res) => {
  res.json({ message: 'Acceso autorizado' });
});

const tareas = [
  { id: 1, descripcion: 'Hacer la compra', completado: false },
  { id: 2, descripcion: 'Lavar el coche', completado: true },
  { id: 3, descripcion: 'Estudiar para el examen', completado: false }
];

// Ruta para obtener la lista de tareas en formato JSON
app.get('/tareas', (req, res) => {
  res.json(tareas);
});

app.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});

app.use(express.json());
// Middleware de nivel de aplicación para validar métodos HTTP
app.use(middlewares.validarMetodosHTTP);
// Importar el router list-view
const listViewRouter = require('./list-view-router');

// Usar el router en una ruta específica
app.use('/listar', listViewRouter);

// se ingresa con http://localhost:3000/listar/incompletas o http://localhost:3000/listar/completas

// Importar el router list-edit
const listEditRouter = require('./list-edit-router');

// Usar el router en rutas específicas
app.use('/editar', listEditRouter);