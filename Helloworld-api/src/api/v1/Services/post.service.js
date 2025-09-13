import { ApiError } from '../../../utils/ApiError.js';  
import pool from '../../../config/db.js';  

export const getAllProduct = async () => {
    const query = 'SELECT * FROM products';
    try {
        const [rows] = await pool.query(query);  
        return rows;
    } catch (error) {
        throw new ApiError(500, 'Error fetching products from the database');
    }
};


export const getProductById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
    

    if (!rows[0]) {
        throw new ApiError(404, "Post not found"); 
    }
    return rows[0];  
};

export const createProduct = async (postData) => {
    const { product_name, price } = postData;

    if (!product_name || typeof product_name !== 'string' || product_name.trim() === '') {
        throw new ApiError(400, 'Product name is required and should be a non-empty string.');
    }

    if (!price || typeof price !== 'number' || price <= 0) {
        throw new ApiError(400, 'Price must be a valid positive number.');
    }

    const query = 'INSERT INTO products (product_name, price) VALUES (?, ?)';

    try {
        const [result] = await pool.query(query, [product_name, price]);
        const newProduct = { id: result.insertId, product_name, price };
        return newProduct;
    } catch (error) {
        console.error('Error creating product:', error);
        throw new ApiError(500, 'Error creating new product');
    }
};

export const updateProduct = async (id, postData) => {
    const { product_name, price } = postData;
    const query = 'UPDATE products SET product_name = ?, price = ? WHERE id = ?';

    try {
        const [result] = await pool.query(query, [product_name, price, id]);
        if (result.affectedRows === 0) {
            throw new ApiError(404, 'Product not found'); 
        }
        return { id, product_name, price };
    } catch (error) {
        throw new ApiError(500, 'Error updating product');
    }
};


export const deleteProduct = async (id) => {
    const query = 'DELETE FROM products WHERE id = ?';

    try {
        const [result] = await pool.query(query, [id]);
        if (result.affectedRows === 0) {
            throw new ApiError(404, 'Product not found');  
        }
        return true; 
    } catch (error) {
        throw new ApiError(500, 'Error deleting product');
    }
};

export const updatePartialProduct = async (id, updateFields) => {
    const { product_name, price } = updateFields;
    const query = 'UPDATE products SET product_name = ?, price = ? WHERE id = ?';

    try {
        const [result] = await pool.query(query, [product_name, price, id]);
        if (result.affectedRows === 0) {
            throw new ApiError(404, 'Product not found');  
        }
        return { id, product_name, price };
    } catch (error) {
        throw new ApiError(500, 'Error partially updating product');
    }
};
