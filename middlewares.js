// middlewares.js

// Middleware para validar métodos HTTP
const validarMetodosHTTP = (req, res, next) => {
    const metodosValidos = ['GET', 'POST', 'PUT', 'DELETE']; // Métodos HTTP válidos
  
    if (!metodosValidos.includes(req.method)) {
      res.status(405).json({ error: 'Método HTTP no permitido' });
      return;
    }
  
    next();
  };
  
  
  module.exports = {
    validarMetodosHTTP,
  };