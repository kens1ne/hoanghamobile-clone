import React, { useEffect, useState } from 'react';
import { IProduct } from '../types/product';
import { Card, Space } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Link, useParams } from 'react-router-dom';
import { ICategory } from '../types/category';
interface IProps {
    products: IProduct[];
    categories: ICategory[];
}
const CategoryPage = ({ products, categories }: IProps) => {
    const [category, setCategory] = useState<ICategory>();
    const [listProducts, setListProduct] = useState<IProduct[]>([]);
    const { id } = useParams();

    useEffect(() => {
        if (categories) {
            setCategory(categories.find((item) => item._id === id));
        }
    }, [categories, id]);

    useEffect(() => {
        if (listProducts) {
            setListProduct(products.filter((item) => item.categoryId === id));
        }
    }, [category]);

    return (
        <>
            <section className="product">
                <div className="container">
                    <div className="title">
                        <a href="">
                            <h4 className="uppercase">{category?.name}</h4>
                        </a>
                    </div>
                    <div className="product-list">
                        {listProducts.map((item, index) => {
                            return (
                                <div className="item">
                                    <div className="img">
                                        <Link to={`/products/${item._id}`}>
                                            <img src={item.images[0]} alt="" className="w-full" />
                                        </Link>
                                    </div>
                                    <div className="info">
                                        <Link to={`/products/${item._id}`}>{item.name}</Link>
                                        <span className="price">{item.price} ₫</span>
                                    </div>
                                    <div className="note">
                                        <div className="bag">KM</div>Giảm thêm tới 500.000đ khi thanh toán
                                    </div>
                                    <div className="promote">
                                        <Link to={`/products/${item._id}`}>
                                            <ul>
                                                <li>
                                                    <div className="bag">KM</div>Giảm thêm tới 500.000đ khi thanh toán
                                                </li>
                                                <li>
                                                    <div className="bag">KM</div>Giảm thêm tới 500.000đ khi thanh toán
                                                </li>
                                                <li>
                                                    <div className="bag">KM</div>Giảm thêm tới 500.000đ khi thanh toán
                                                </li>
                                            </ul>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default CategoryPage;
