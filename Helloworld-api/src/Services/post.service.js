let products = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Smartphones", price: 500 },
    { id: 3, name: "Tablet", price: 300 }
];
let nextId = 4;

export const getAllProduct = () => {
    return products;
};

export const getProductById = (id) => {
    return products.find(p => p.id === id);
};

export const createProduct = (postData) => {
    const newProduct = { id: nextId++, ...postData };
    products.push(newProduct);
    return newProduct;
};

export const updateProduct = (id, postData) => {
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
        return null;
    }
    products[productIndex] = { ...products[productIndex], ...postData };
    return products[productIndex];
};

export const deleteProduct = (id) => {
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
        return false;
    }
    products.splice(productIndex, 1);
    return true;
};

export const updatePartialProduct = (id, updateFields) => {
  const productIndex = products.findIndex(p => p.id === parseInt(id, 10));
  if (productIndex === -1) {
    return null;
  }
  products[productIndex] = { ...products[productIndex], ...updateFields };
  return products[productIndex];
};

