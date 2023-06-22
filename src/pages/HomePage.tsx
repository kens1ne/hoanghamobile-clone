import React from 'react';
import { IProduct } from '../types/product';
import { Button, Card, Col, Menu, Row, Space } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';
import { ICategory } from '../types/category';

interface IProps {
    products: IProduct[];
    categories: ICategory[];
}
const HomePage = (props: IProps) => {
    return (
        <>
            <section className="banner-top">
                <div className="prev">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-caret-left-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                    </svg>
                </div>
                <div className="next">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-caret-right-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                    </svg>
                </div>
                <a href="" className="border-">
                    <img
                        src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/04/05/sale-samsung-s23-sr-01.jpg"
                        alt=""
                    />
                </a>
                <div className="quick-sales">
                    <div className="item">
                        <a href="">
                            <img
                                src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/04/05/sanphamhot-s20-fe.png"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="item">
                        <a href="">
                            <img src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/04/07/group-47.png" alt="" />
                        </a>
                    </div>
                    <div className="item">
                        <a href="">
                            <img src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/04/08/group-22.png" alt="" />
                        </a>
                    </div>
                    <div className="item">
                        <a href="">
                            <img src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/03/17/group-47.png" alt="" />
                        </a>
                    </div>
                </div>
            </section>
            <section className="product">
                <div className="container">
                    <div className="title">
                        <a href="">
                            <h4 className="uppercase">PRODUCT LIST</h4>
                        </a>
                    </div>
                    <div className="product-list">
                        {props.products.map((item, index) => {
                            return (
                                <div className="item" key={item._id}>
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

export default HomePage;
