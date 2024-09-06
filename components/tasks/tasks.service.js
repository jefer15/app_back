const sequelize = require('../../db/config');

const tasks = async () => {
  try {
    const sequelizeResolve = await sequelize;
    const [results, metadata] = await sequelizeResolve.query(
      `
      SELECT id AS "id",
        title AS "title",
        description AS "description",
        status AS "status"
      from PUBLIC.tasks 
      ORDER BY id
        `,
      {
        replacements: {
        },
      },
    );

    return {
      status: 200, code: 1, message: 'Success', data:results,
    };
  } catch (err) {
    console.log(err)
    return { status: 500, code: 2, message: 'Error' };
  }
};

const createTasks = async (task) => {
  try {
    const sequelizeResolve = await sequelize;
    const [results, metadata] = await sequelizeResolve.query(
      `
      INSERT INTO public.tasks (title,
      description,
      log)
      VALUES (:title,
        :description,
        jsonb_build_object(
          'createdAt', NOW(),
          'timeLastChange', NOW()
        ) );
        `,
      {
        replacements: {
          title: task.title,
          description: task.description,
        },
      },
    );

    return {
      status: 200, code: 1, message: 'Success',
    };
  } catch (err) {
    console.log(err)
    if (err?.original?.code === '23505') {
      return { status: 406, code: 3, message: 'Exists' };
    }
    return { status: 500, code: 2, message: 'Error' };
  }
};

const updateTasks = async (id, task) => {
  try {
    const sequelizeResolve = await sequelize;
    const [results, metadata] = await sequelizeResolve.query(
      `

      UPDATE public.tasks
      SET
      title = :title,
      description = :description,
      log = jsonb_build_object(
        'createdAt',log->>'createdAt',
        'timeLastChange',now()
      )
      WHERE
      id = :id;
        `,
      {
        replacements: {
          title: task.title,
          description: task.description,
          id: id
        },
      },
    );

    return {
      status: 200, code: 1, message: 'Success',
    };
  } catch (err) {
    console.log(err)
    if (err?.original?.code === '23505') {
      return { status: 406, code: 3, message: 'Exists' };
    }
    return { status: 500, code: 2, message: 'Error' };
  }
};

const updateStatusTasks = async (id, status) => {
  try {
    const sequelizeResolve = await sequelize;
    const [results, metadata] = await sequelizeResolve.query(
      `

      UPDATE public.tasks
      SET
      status = :status,
      log = jsonb_build_object(
        'createdAt',cast(log->>'createdAt' AS varchar),
        'timeLastChange',now()
      )
      WHERE
      id = :id;
        `,
      {
        replacements: {
          id,
          status
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

const deleteTasks = async (id) => {
  try {
    const sequelizeResolve = await sequelize;
    const [results, metadata] = await sequelizeResolve.query(
      `

      DELETE FROM public.tasks
      WHERE
      status != 'P' and id = :id;
        `,
      {
        replacements: {
          id
        },
      },
    );

    if (metadata.rowCount === 0) {
      return {
        status: 404,
        code: 0,
        message: 'No se eliminó ninguna tarea, puede que no exista o esté en estado P',
      };
    }

    return {
      status: 200, code: 1, message: 'Success',
    };
  } catch (err) {
    console.log(err)
    return { status: 500, code: 2, message: 'Error' };
  }
};

module.exports = {
  tasks,
  createTasks,
  updateTasks,
  updateStatusTasks,
  deleteTasks
};
