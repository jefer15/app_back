const sequelize = require('../../db/config');
const jwt = require('../../utils/jwt')

const login = async (user) => {
  try {
    const sequelizeResolve = await sequelize;
    const [results, metadata] = await sequelizeResolve.query(
      `
      SELECT 
        id AS "id",
        identification AS "identification"
      FROM public.user
      WHERE identification = :identification AND password = :password
       `,
      {
        replacements: {
          identification: user.identification,
          password: user.password
        },
      },
    );

    if(results.length === 0)
      return { status: 200, code: 2, message: "User not exists" };

    const response = results[0]
    const token = await jwt.createToken(response)

    return {
      status: 200,
      code: 1,
      message: 'Success', data: {
        token,
        user: response
      },
    };
  } catch (err) {
    console.log(err)
    return { status: 500, code: 3, message: 'Error' };
  }
};

module.exports = {
  login
};
