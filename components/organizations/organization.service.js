const sequelize = require('../../db/config');

const organizations = async () => {
  try {
    const sequelizeResolve = await sequelize;
    const [results, metadata] = await sequelizeResolve.query(
      `
        SELECT
          id AS "id",
          NAME AS "name",
          contact_person AS "contactPerson",
          contact_email AS "contactEmail",
          phone AS "phone",
          address AS "address",
          TYPE AS "type"
        from public.organizations
        ORDER BY id
          `,
      {
        replacements: {
        },
      },
    );

    return {
      status: 200, code: 1, message: 'Success', data: results,
    };
  } catch (err) {
    console.log(err)
    return { status: 500, code: 2, message: 'Error' };
  }
};

const createOrganization = async (organization) => {
  try {
    const sequelizeResolve = await sequelize;
    const [results, metadata] = await sequelizeResolve.query(
      `
        INSERT INTO public.organizations (name,
        contact_person,
        contact_email,
        phone,
        address,
        type,
        log)
        VALUES (
          :name,
          :contactPerson,
          :contactEmail,
          :phone,
          :address,
          :type,
          jsonb_build_object(
            'createdAt', NOW(),
            'timeLastChange', NOW()
          ) );
          `,
      {
        replacements: {
          name: organization.name,
          contactPerson: organization.contactPerson,
          contactEmail: organization.contactEmail,
          phone: organization.phone,
          address: organization.address,
          type: organization.type
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

const updateOrganization = async (id, organization) => {
  try {
    const sequelizeResolve = await sequelize;
    const [results, metadata] = await sequelizeResolve.query(
      `
  
        UPDATE public.organizations
        SET
        name = :name,
        contact_person = :contactPerson,
        contact_email = :contactEmail,
        phone = :phone,
        address = :address,
        type = :type,
        log = jsonb_build_object(
          'createdAt',log->>'createdAt',
          'timeLastChange',now()
        )
        WHERE
        id = :id;
          `,
      {
        replacements: {
          name: organization.name,
          contactPerson: organization.contactPerson,
          contactEmail: organization.contactEmail,
          phone: organization.phone,
          address: organization.address,
          type: organization.type,
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

const deleteOrganization = async (id) => {
  try {
    const sequelizeResolve = await sequelize;
    const [results, metadata] = await sequelizeResolve.query(
      `
  
        DELETE FROM public.organizations
        WHERE
        id = :id;
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
  organizations,
  createOrganization,
  updateOrganization,
  deleteOrganization
}
