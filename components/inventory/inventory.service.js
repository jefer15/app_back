const sequelize = require('../../db/config');

const inventories = async () => {
  try {
    const sequelizeResolve = await sequelize;
    const [results, metadata] = await sequelizeResolve.query(
      `
        SELECT 
          id AS "id",
          id_organization AS "idOrganization",
          transaction_type AS "transactionType",
          quantity AS "quantity",
          unit_price AS "unitPrice",
          total_value AS "totalValue",
          description AS "description",
          mark AS "mark",
          transaction_date AS "transactionDate"
        FROM PUBLIC.inventory_transactions
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

const createInventory = async (inventory) => {
  try {
    const sequelizeResolve = await sequelize;
    const [results, metadata] = await sequelizeResolve.query(
      `
        INSERT INTO public.organizations (id_organization,
        transaction_type,
        quantity,
        unit_price,
        address,
        description,
        mark,
        transaction_date,
        log)
        VALUES (
          :idOrganization,
          :transactionType,
          :unitPrice,
          :address,
          :description,
          :mark,
          :transactionDate,
          jsonb_build_object(
            'createdAt', NOW(),
            'timeLastChange', NOW()
          ) );
          `,
      {
        replacements: {
          idOrganization: inventory.idOrganization,
          transactionType: inventory.transactionType,
          unitPrice: inventory.unitPrice,
          address: inventory.address,
          description: inventory.description,
          mark: inventory.mark,
          transactionDate: inventory.transactionDate
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

module.exports = {
  inventories,
  createInventory
}
