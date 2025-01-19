// Import Query function from db.js
const { dbQuery } = require('./db');

const ProductDB = {

    findByCategory: async (id) => {
        const result = await dbQuery(
            `SELECT products.* 
                FROM products, products_categories 
                WHERE products_categories.product_id = products.product_id 
                AND 
                (categories_id = $1 OR $1 IS NULL) 
                ORDER BY product_name ASC`,
            [id]
        );
        return result.rows;
    }, 
    findById: async (id) => {
        const result = await dbQuery(
            `SELECT * 
                FROM products 
                WHERE product_id = $1 `,
            [id]
        );
        return result.rows || null
    },

};

module.exports = ProductDB;