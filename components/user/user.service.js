const sequelize = require('../../db/config');

const register = async (user) => {
  try {
    const sequelizeResolve = await sequelize;
    const [results, metadata] = await sequelizeResolve.query(
      `
      INSERT INTO public.user (identification,
      name,
      last_name,
      email,
      password,
      log)
      VALUES (:identification,
        :name,
        :lastName,
        :email,
        :password,
        JSON_OBJECT(
          'createdAt', NOW(),
          'timeLastChange', NOW()
        ) );
        `,
      {
        replacements: {
          identification: user.identification,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          password: user.password
        },
      },
    );

    return {
      status: 200, code: 1, message: 'Success',
    };
  } catch (err) {
    console.log(err)
    return { status: 500, code: 2, message: 'Error' };
  }
};

const findAll = async (user) => {
  try {
    const sequelizeResolve = await sequelize;
    const [results, metadata] = await sequelizeResolve.query(
      `
      INSERT INTO user (identification,
      name,
      last_name,
      email,
      password,
      log)
      VALUES (:identification,
        :name,
        :lastName,
        :email,
        :password,
        JSON_OBJECT(
          'createdAt', NOW(),
          'timeLastChange', NOW()
        ) );
        `,
      {
        replacements: {
          identification: user.identification,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          password: user.password
        },
      },
    );

    return {
      status: 200, code: 1, message: 'Success',
    };
  } catch (err) {
    console.log(err)
    return { status: 500, code: 2, message: 'Error' };
  }
};

module.exports = {
  register,
  findAll
};
