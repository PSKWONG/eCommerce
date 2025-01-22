//--------------------- Import Modules ---------------------
const { dbQuery } = require('./db');

const CartDB = {
    getAllCartItems: async (user_id) => {
        const result = await dbQuery(
            `
            SELECT users_carts.product_id, product_name, unit_price, quantity
            FROM users_carts, products
            WHERE 
                users_carts.product_id = products.product_id
            AND
                user_id = $1
             `,
            [user_id]
        );
        return result.rows || null;
    },

    updateCatItems: async (item) => {
        const { user_id, product_id, quantity } = item

        const result = await dbQuery(
            `
                WITH return AS (
                 UPDATE users_carts 
                 SET 
                    quantity = $3
                 WHERE
                    user_id = $1
                 AND
                    product_id = $2
                 RETURNING product_id, quantity
                 )
                 SELECT return.product_id, products.product_name, products.unit_price,return.quantity
                 FROM return
                 JOIN products
                 ON return.product_id = products.product_id;
                 `,
            [user_id, product_id, quantity]
        );
        return result.rows[0] || null;
    }, 

    createCartItems: async (item) => {
        const {user_id, product_id, quantity} = item; 

        const result = await dbQuery(
            `
            WITH return AS (
                INSERT INTO users_carts (user_id,product_id,quantity)
                VALUES ($1,$2,$3) 
                RETURNING product_id, quantity
            )
            SELECT return.product_id, products.product_name, products.unit_price,return.quantity
            FROM return
            JOIN products
            ON return.product_id = products.product_id;
            `,
            [user_id, product_id, quantity]
        );

        return result.rows[0] || null;
    }


};

module.exports = CartDB;