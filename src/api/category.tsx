import instance from './instance';
import { ICategory } from '../types/category';

const getCategories = () => {
    return instance.get('/categories');
};

const addCategory = (category: ICategory) => {
    return instance.post('/categories', category);
};

const updateCategory = (category: any) => {
    const { _id, name } = category;
    return instance.put('/categories/' + _id, { name });
};

const deleteCategory = (id: string) => {
    return instance.delete(`/categories/${id}`);
};

export { getCategories, addCategory, updateCategory, deleteCategory };
