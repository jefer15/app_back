const getConfigDataBase = async () => {
  return {
    database: process.env.DB_NAME || 'solati', // Nombre de la base de datos
    username: process.env.DB_USER || 'postgres', // Usuario de PostgreSQL
    password: process.env.DB_PASSWORD || 'postgres', // Contraseña del usuario de PostgreSQL
    host: process.env.DB_HOST || 'localhost', // Dirección del servidor (localhost para conexiones locales)
    port: process.env.DB_PORT || '5432', // Puerto de PostgreSQL (5432 es el puerto predeterminado)
  };
};

module.exports = {
  getConfigDataBase,
};
