// const express = require('express');
// const listEditRouter = express.Router();

// // Lista de tareas como objetos
// let tareas = [
//   { id: 1, descripcion: 'Hacer la compra', completado: false },
//   { id: 2, descripcion: 'Estudiar JavaScript', completado: true },
//   { id: 3, descripcion: 'Hacer ejercicio', completado: false },
// ];

// // Ruta específica para crear una tarea (POST)
// listEditRouter.post('/crear', (req, res) => {
//   const nuevaTarea = req.body;
//   tareas.push(nuevaTarea);
//   res.json({ message: 'Tarea creada con éxito', tarea: nuevaTarea });
// });

// // Ruta específica para eliminar una tarea (DELETE)
// listEditRouter.delete('/eliminar/:id', (req, res) => {
//   const taskId = req.params.id;
//   tareas = tareas.filter((tarea) => tarea.id !== parseInt(taskId));
//   res.json({ message: 'Tarea eliminada con éxito' });
// });

// // Ruta específica para actualizar una tarea (PUT)
// listEditRouter.put('/actualizar/:id', (req, res) => {
//   const taskId = req.params.id;
//   const tareaActualizada = req.body;
//   tareas = tareas.map((tarea) => {
//     if (tarea.id === parseInt(taskId)) {
//       return tareaActualizada;
//     }
//     return tarea;
//   });
//   res.json({ message: 'Tarea actualizada con éxito', tarea: tareaActualizada });
// });

// module.exports = listEditRouter;
const express = require('express');
const listEditRouter = express.Router();

// Lista de tareas como objetos
let tareas = [
  { id: 1, descripcion: 'Hacer la compra', completado: false },
  { id: 2, descripcion: 'Estudiar JavaScript', completado: true },
  { id: 3, descripcion: 'Hacer ejercicio', completado: false },
];

// Middleware para manejar errores en solicitudes POST y PUT
const validarTarea = (req, res, next) => {
  const nuevaTarea = req.body;

  if (!nuevaTarea || Object.keys(nuevaTarea).length === 0) {
    res.status(400).json({ error: 'Cuerpo de solicitud vacío' });
    return;
  }

  if (!nuevaTarea.descripcion || typeof nuevaTarea.descripcion !== 'string') {
    res.status(400).json({ error: 'La descripción de la tarea es requerida y debe ser una cadena de caracteres' });
    return;
  }

  if (typeof nuevaTarea.completado !== 'boolean') {
    res.status(400).json({ error: 'El estado de la tarea debe ser un valor booleano' });
    return;
  }

  next();
};

// Ruta específica para crear una tarea (POST)
listEditRouter.post('/crear', validarTarea, (req, res) => {
  const nuevaTarea = req.body;
  // Agregar la lógica para crear una tarea aquí
  tareas.push(nuevaTarea);
  res.json({ message: 'Tarea creada con éxito', tarea: nuevaTarea });
});

// Ruta específica para actualizar una tarea (PUT)
listEditRouter.put('/actualizar/:id', validarTarea, (req, res) => {
  const taskId = req.params.id;
  const tareaActualizada = req.body;
  // Agregar la lógica para actualizar una tarea aquí
  tareas = tareas.map((tarea) => {
    if (tarea.id === parseInt(taskId)) {
      return tareaActualizada;
    }
    return tarea;
  });
  res.json({ message: 'Tarea actualizada con éxito', tarea: tareaActualizada });
});

// Ruta específica para eliminar una tarea (DELETE)
listEditRouter.delete('/eliminar/:id', (req, res) => {
  const taskId = req.params.id;
  tareas = tareas.filter((tarea) => tarea.id !== parseInt(taskId));
  res.json({ message: 'Tarea eliminada con éxito' });
});

module.exports = listEditRouter;