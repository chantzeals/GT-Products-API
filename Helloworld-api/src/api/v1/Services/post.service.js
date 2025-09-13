import NotFoundError from '../../../utils/NotFoundError.js';
import pool from '../../../config/db.js';  


export const getAllProduct = async () => {
    const query = 'SELECT * FROM products';
    try {
        const [rows] = await pool.execute(query);  // Executes query and retrieves rows
        return rows;
    } catch (error) {
        throw new Error('Error fetching products from the database');
    }
};

export const getProductById = async (id) => {
    const query = 'SELECT * FROM products WHERE id = ?';
    try {
        const [rows] = await pool.execute(query, [id]);
        if (rows.length === 0) {
            throw new NotFoundError(`Product with ID ${id} not found.`);
        }
        return rows[0];  
    } catch (error) {
        throw new Error('Error fetching the product');
    }
};


export const createProduct = async (postData) => {
    const { product_name, price } = postData;

    if (!product_name || typeof product_name !== 'string' || product_name.trim() === '') {
        throw new Error('Product name is required and should be a non-empty string.');
    }
    if (!price || typeof price !== 'number' || price <= 0) {
        throw new Error('Price must be a valid positive number.');
    }

    const query = 'INSERT INTO products (product_name, price) VALUES (?, ?)';

    try {
        const [result] = await pool.execute(query, [product_name, price]);
        const newProduct = { id: result.insertId, product_name, price };  
        return newProduct;
    } catch (error) {
        console.error('Error creating product:', error);  
        throw new Error(`Error creating new product: ${error.message}`); 
    }
};


export const updateProduct = async (id, postData) => {
    const { product_name, price } = postData;
    const query = 'UPDATE products SET product_name = ?, price = ? WHERE id = ?';
    try {
        const [result] = await pool.execute(query, [product_name, price, id]);
        if (result.affectedRows === 0) {
            return null;  
        }
        return { id, product_name, price };
    } catch (error) {
        throw new Error('Error updating product');
    }
};


export const deleteProduct = async (id) => {
    const query = 'DELETE FROM products WHERE id = ?';
    try {
        const [result] = await pool.execute(query, [id]);
        if (result.affectedRows === 0) {
            return false;  
        }
        return true;
    } catch (error) {
        throw new Error('Error deleting product');
    }
};


export const updatePartialProduct = async (id, updateFields) => {
    const { product_name, price } = updateFields;
    const query = 'UPDATE products SET product_name = ?, price = ? WHERE id = ?';
    try {
        const [result] = await pool.execute(query, [product_name, price, id]);
        if (result.affectedRows === 0) {
            return null;  
        }
        return { id, product_name, price };
    } catch (error) {
        throw new Error('Error partially updating product');
    }
};
