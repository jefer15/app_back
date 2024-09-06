const Sequelize = require('sequelize');
const config = require('../config');

const getSequelize = async () => {
  const configDataBase = await config.getConfigDataBase();

  const sequelize = new Sequelize(
    configDataBase.database, // Nombre de la base de datos
    configDataBase.username, // Nombre de usuario de la base de datos
    configDataBase.password, // Contraseña del usuario de la base de datos
    {
      host: configDataBase.host, // Dirección del servidor de la base de datos
      port: configDataBase.port, // Puerto de PostgreSQL (5432 por defecto)
      dialect: 'postgres', // Cambiar de 'mysql' a 'postgres' para PostgreSQL
      logging: false, // Desactiva el logging de Sequelize
    }
  );

  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos PostgreSQL');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }

  return sequelize;
};

module.exports = getSequelize();
