const sequelize = require('../../db/config');

const inventories = async () => {
  try {
    const sequelizeResolve = await sequelize;
    const [results, metadata] = await sequelizeResolve.query(
      `
        SELECT 
          it.id AS "id",
          it.id_organization AS "idOrganization",
          it.transaction_type AS "transactionType",
          it.quantity AS "quantity",
          it.unit_price AS "unitPrice",
          it.total_value AS "totalValue",
          it.description AS "description",
          it.mark AS "mark",
          it.transaction_date AS "transactionDate",
          o.name AS "nameOrganization"
        FROM PUBLIC.inventory_transactions it
        JOIN PUBLIC.organizations o ON it.id_organization = o.id
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

const saveInventary = async (inventory) => {
  for (let i = 0; i < inventory.length; i++) {
    inventory[i] = await createInventory(inventory[i]);
  }
  return {
    status: 200, code: 1, message: 'Success', data: inventory
  };
};

const createInventory = async (inventory) => {
  try {
    const sequelizeResolve = await sequelize;
    const [results, metadata] = await sequelizeResolve.query(
      `
        INSERT INTO public.inventory_transactions (
        id_organization,
        transaction_type,
        quantity,
        unit_price,
        description,
        mark,
        transaction_date,
        log)
        VALUES (
          :idOrganization,
          :transactionType,
          :quantity,
          :unitPrice,
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
          quantity: inventory.quantity,
          unitPrice: inventory.unitPrice,
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
    return { status: 500, code: 2, message: 'Error' };
  }
};

module.exports = {
  inventories,
  saveInventary
}
