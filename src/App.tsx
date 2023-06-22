import './index.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { addProduct, deleteProduct, getAllProduct, updateProduct } from './api/product';
import AddProductPage from './pages/admin/product/AddProduct';
import ProductManagementPage from './pages/admin/product/ProductManagement';
import UpdateProductPage from './pages/admin/product/UpdateProduct';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/Product';
import ProductDetailPage from './pages/ProductDetail';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import WebsiteLayout from './components/WebsiteLayout';
import CategoriesManagement from './pages/admin/category/CategoriesManagement';
import AddCategory from './pages/admin/category/AddCategory';
import { getCategories } from './api/category';
import { ICategory } from './types/category';
import { IProduct } from './types/product';
import UpdateCategoryPage from './pages/admin/category/UpdateCategory';
import ManagementLayout from './components/ManagementLayout';
import { message } from 'antd';
import CategoryPage from './pages/CategoryPage';
import AdminPage from './pages/admin/AdminPage';
import Logout from './pages/auth/Logout';
import { set } from 'react-hook-form';

function App() {
    const [products, setProduct] = useState<IProduct[]>([]);
    const [categories, setCategory] = useState<ICategory[]>([]);
    const [userInfo, setUserInfo] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getAllProduct().then(({ data }) => setProduct(data));
        getCategories().then(({ data }) => setCategory(data));
    }, []);

    useEffect(() => {
        const dataUsers = localStorage.getItem('userInfo');
        if (dataUsers) {
            setUserInfo(JSON.parse(dataUsers));
        } else {
            setUserInfo(undefined);
        }
    }, [localStorage.getItem('userInfo')]);

    const onHandleRemove = (id: string) => {
        deleteProduct(id)
            .then(() => setProduct(products.filter((item: IProduct) => item._id !== id)))
            .catch(({ response }) => {
                if (response.data.name == 'JsonWebTokenError' || response.data.name == 'TokenExpiredError') {
                    localStorage.removeItem('accessToken');
                    navigate('/auth/login');
                }
            });
    };
    const onHandleAdd = (product: IProduct) => {
        addProduct(product)
            .then(() => {
                message.success(`Thêm sản phẩm thành công.`);
                getAllProduct().then(({ data }) => setProduct(data));
            })
            .then(() => navigate('/admin/products'))
            .catch(({ response }) => {
                console.log(response);
                message.error(response.data.message);
                if (response.data.name == 'JsonWebTokenError' || response.data.name == 'TokenExpiredError') {
                    localStorage.removeItem('accessToken');
                    navigate('/auth/login');
                }
            });
    };
    const onHandleUpdate = (product: IProduct) => {
        updateProduct(product)
            .then(() => {
                message.success(`Sửa sản phẩm thành công.`);
                getAllProduct().then(({ data }) => setProduct(data));
            })
            .then(() => navigate('/admin/products'))
            .catch(({ response }) => {
                message.error(response.data.message);
                if (response.data.name == 'JsonWebTokenError' || response.data.name == 'TokenExpiredError') {
                    localStorage.removeItem('accessToken');
                    navigate('/auth/login');
                }
            });
    };

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/auth"
                    element={<WebsiteLayout categories={categories} products={products} userInfo={userInfo} />}
                >
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
                <Route path="/logout" element={<Logout />}></Route>

                <Route
                    path="/"
                    element={<WebsiteLayout categories={categories} products={products} userInfo={userInfo} />}
                >
                    <Route index element={<HomePage categories={categories} products={products} />} />
                    <Route path="products">
                        <Route index element={<ProductsPage products={products} onRemove={onHandleRemove} />} />
                        <Route path=":id" element={<ProductDetailPage products={products} />} />
                    </Route>
                    <Route path="category">
                        <Route path=":id" element={<CategoryPage products={products} categories={categories} />} />
                    </Route>
                </Route>

                <Route path="/admin" element={<ManagementLayout />}>
                    <Route
                        index
                        element={
                            <ProtectedRoute admin={true}>
                                <AdminPage categories={categories} products={products} />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="products">
                        <Route
                            index
                            element={
                                <ProtectedRoute admin={true}>
                                    <ProductManagementPage products={products} onRemove={onHandleRemove} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="add"
                            element={
                                <ProtectedRoute admin={true}>
                                    <AddProductPage categories={categories} onAdd={onHandleAdd} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path=":id/update"
                            element={
                                <ProtectedRoute admin={true}>
                                    <UpdateProductPage
                                        onUpdate={onHandleUpdate}
                                        products={products}
                                        categories={categories}
                                    />
                                </ProtectedRoute>
                            }
                        />
                    </Route>

                    <Route path="categories">
                        <Route
                            index
                            element={
                                <ProtectedRoute admin={true}>
                                    <CategoriesManagement categories={categories} setCategory={setCategory} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="add"
                            element={
                                <ProtectedRoute admin={true}>
                                    <AddCategory categories={categories} setCategory={setCategory} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path=":id/update"
                            element={
                                <ProtectedRoute admin={true}>
                                    <UpdateCategoryPage categories={categories} setCategory={setCategory} />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
