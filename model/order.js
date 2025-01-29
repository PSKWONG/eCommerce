//--------------------- Import Modules ---------------------
const { dbQuery } = require('./db');

const OrderDB = {

    create: async (payment_ID, user_id, record) => {
        try {

            const result = await dbQuery(
                `
                INSERT INTO orders (
                    order_date, 
                    payment_ID,
                    user_id,
                    cart_record
                )
                VALUES ( NOW(), $1, $2, $3)
                RETURNING *
                `,
                [payment_ID, user_id, record]
            );

            return result.rows[0] || null;

        } catch (err) {
            console.log('Error in creating order in connecting the database', err);
            throw err;
        }
    },

    checkOutItems: async (orderId, userId) => {
        try {
            const result = await dbQuery(
                `
                WITH cart AS(
                    SELECT 
                        product_id 
                    FROM users_carts
                    WHERE 
                        user_id = $2
                )
                INSERT INTO orders_products (order_id, product_id)
                SELECT $1, product_id
                FROM cart                    
                `,
                [orderId,userId ]
            );
            return result.rowCount || 0 ; 

        } catch (err) {
            console.log('Error in creating order in checkout database connection', err);
            throw err;
        }
    }

}

module.exports = OrderDB