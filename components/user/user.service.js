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

const findAll = async () => {
  try {
    const sequelizeResolve = await sequelize;
    const [results, metadata] = await sequelizeResolve.query(
      `
      SELECT 
        id AS "id",
        identification AS "identification",
        NAME AS "name",
        last_name AS "lastName",
        email AS "email"
      FROM PUBLIC.user
      ORDER BY id
        `,
      {
        replacements: {
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

const updateUser = async (id, user) => {
  try {
    const sequelizeResolve = await sequelize;
    const [results, metadata] = await sequelizeResolve.query(
      `
      UPDATE public.user 
      SET
      identification = :identification,
      name = :name,
      last_name = :lastName,
      email = :email,
      log = jsonb_build_object(
        'createdAt',cast(log->>'createdAt' AS varchar),
        'timeLastChange',now()
      )
      WHERE
      id = :id;
        `,
      {
        replacements: {
          id:id,
          identification: user.identification,
          name: user.name,
          lastName: user.lastName,
          email: user.email
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

const deleteUser = async (id) => {
  try {
    const sequelizeResolve = await sequelize;
    const [results, metadata] = await sequelizeResolve.query(
      `
      DELETE FROM PUBLIC.user
      WHERE 
      id = :id
        `,
      {
        replacements: {
          id
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
  findAll,
  updateUser,
  deleteUser
};
