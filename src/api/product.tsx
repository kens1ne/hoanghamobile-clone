import instance from './instance';
import { IProduct } from '../types/product';

const getAllProduct = () => {
    return instance.get('/products');
};
const getOneProduct = (id: number) => {
    return instance.get('/products/' + id);
};
const addProduct = (product: IProduct) => {
    return instance.post('/products', product);
};
const deleteProduct = (id: string) => {
    return instance.delete(`/products/${id}`);
};
const updateProduct = (product: IProduct) => {
    const { __v, _id, ...rest } = product;
    return instance.put('/products/' + _id, { ...rest });
};

export { getAllProduct, getOneProduct, addProduct, deleteProduct, updateProduct };
