import React, { useEffect, useState } from 'react';
import { Menu, Input } from 'antd';
import { Link, Outlet, useParams } from 'react-router-dom';
import { ICategory } from '../types/category';
import { AiOutlineSearch } from 'react-icons/ai';
import { IProduct } from '../types/product';

interface IProps {
    categories: ICategory[];
    products: IProduct[];
    userInfo: any;
}
const WebsiteLayout = (props: IProps) => {
    const [userInfo, setUserInfo] = useState<string | null>();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchSuggestions, setSearchSuggestions] = useState<boolean>(false);
    const [productSuggestions, setProductSuggestions] = useState<IProduct[]>([]);

    useEffect(() => {
        setProductSuggestions(
            props.products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())),
        );
    }, [searchTerm]);

    useEffect(() => {
        document.title = 'Nguyen Duy Tan';
    }, [document.title]);

    return (
        <>
            <header>
                <section className="menu-top">
                    <ul>
                        {props.categories.map((category, index) => {
                            return (
                                <li key={category._id}>
                                    <Link to={`/category/${category._id}`}>{category.name}</Link>
                                </li>
                            );
                        })}
                        {props.userInfo?.role === 'admin' && (
                            <li>
                                <Link to="/admin">Admin</Link>
                            </li>
                        )}
                        {props.userInfo ? (
                            <>
                                <li>
                                    <Link to="#">{props.userInfo?.username}</Link>
                                </li>
                                <li>
                                    <Link to="/logout">Đăng xuất</Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to={`/auth/login`}>Đăng nhập</Link>
                            </li>
                        )}
                    </ul>
                </section>
                <section className="header-search">
                    <div className="logo">
                        <Link to="/">
                            <img src="https://hoanghamobile.com/Content/web/img/logo-text.png" alt="" />
                        </Link>
                    </div>
                    <div className="search-box">
                        <form action="">
                            <div className="border">
                                <Input
                                    placeholder="Search product"
                                    onChange={(event) => {
                                        setSearchTerm(event.target.value);
                                        if (event.target.value.length > 0) {
                                            setSearchSuggestions(true);
                                        } else {
                                            setSearchSuggestions(false);
                                        }
                                    }}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="order">
                        <a href="" className="check-order">
                            <span>
                                <i className="fa-solid fa-truck fa-2x"></i>
                            </span>
                            <span>Kiểm tra đơn hàng</span>
                        </a>
                        <a href="" className="cart">
                            <i className="fa-solid fa-cart-shopping fa-2x"></i>
                        </a>
                    </div>
                </section>
                <section>
                    <Menu
                        className="categories"
                        mode="horizontal"
                        items={[
                            {
                                key: 'home',
                                label: (
                                    <Link className="category" to="/" style={{ color: '#fff' }}>
                                        Trang chủ
                                    </Link>
                                ),
                            },
                            ...props.categories.map((category, index) => {
                                const key = index + 1;
                                return {
                                    key,
                                    label: (
                                        <Link
                                            className="category"
                                            to={`/category/${category._id}`}
                                            style={{ color: '#fff' }}
                                        >
                                            {category.name}
                                        </Link>
                                    ),
                                };
                            }),
                        ]}
                    />
                </section>
            </header>
            <article>
                <Outlet />
            </article>
            <footer>
                <section className="corevalue">
                    <div className="item">
                        <div className="icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="96"
                                height="96"
                                fill="currentColor"
                                className="bi bi-check-circle"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                            </svg>
                        </div>
                        <div className="text">
                            <span>Sản phẩm</span>
                            <strong>CHÍNH HÃNG</strong>
                        </div>
                    </div>
                    <div className="item">
                        <div className="icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="96"
                                height="96"
                                fill="currentColor"
                                className="bi bi-cart-check"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                            </svg>
                        </div>
                        <div className="text">
                            <span>Miễn phí vận chuyển</span>
                            <strong>TOÀN QUỐC</strong>
                        </div>
                    </div>
                    <div className="item">
                        <div className="icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="96"
                                height="96"
                                fill="currentColor"
                                className="bi bi-headphones"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 3a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a6 6 0 1 1 12 0v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1V8a5 5 0 0 0-5-5z" />
                            </svg>
                        </div>
                        <div className="text">
                            <span>Hotline hỗ trợ</span>
                            <strong>1900.2091</strong>
                        </div>
                    </div>
                    <div className="item">
                        <div className="icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="96"
                                height="96"
                                fill="currentColor"
                                className="bi bi-arrow-repeat"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                                <path
                                    fillRule="evenodd"
                                    d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                                />
                            </svg>
                        </div>
                        <div className="text">
                            <span>Thủ tục đổi trả</span>
                            <strong>DỄ DÀNG </strong>
                        </div>
                    </div>
                </section>
                <section className="container">
                    <div className="text-footer">
                        <span>
                            © 2020. CÔNG TY CỔ PHẦN XÂY DỰNG VÀ ĐẦU TƯ THƯƠNG MẠI HOÀNG HÀ. MST: 0106713191. (Đăng ký
                            lần đầu: Ngày 15 tháng 12 năm 2014, Đăng ký thay đổi ngày 29/12/2020)
                        </span>
                        <strong>GP số 426/GP-TTĐT do sở TTTT Hà Nội cấp ngày 22/01/2021</strong>
                        <small>
                            Địa chỉ: 26 Phù Đổng Thiên Vương, P. Phạm Đình Hổ, Q. Hai Bà Trưng, Hà Nội. Điện thoại:
                            1900.2091. Chịu trách nhiệm nội dung: Hoàng Ngọc Chiến.
                        </small>
                        <small>
                            Designed by: <b>DuyTan</b>
                        </small>
                    </div>
                </section>
            </footer>
            {searchSuggestions && (
                <div
                    className="autocomplete-suggestions"
                    style={{
                        position: 'absolute',
                        maxHeight: 450,
                        zIndex: 9999,
                        top: 110,
                        left: '33%',
                        width: 715,
                        paddingTop: 10,
                        paddingBottom: 10,
                    }}
                >
                    {productSuggestions.map((suggestion) => {
                        return (
                            <Link to={'/products/' + suggestion._id} onClick={() => setSearchSuggestions(false)}>
                                <div className="autocomplete-suggestion" data-index={0}>
                                    <div className="search-item">
                                        <div className="img">
                                            <img src={suggestion.images[0]} style={{ width: '70%' }} />
                                        </div>
                                        <div className="info">
                                            <h2 style={{ textDecoration: 'none' }}>{suggestion.name}</h2>
                                            <h3>{suggestion.price} ₫</h3>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}

                    <p className="more-results">
                        Hiển thị kết quả cho:
                        <b style={{ marginLeft: 5 }}>{searchTerm}</b>
                    </p>
                </div>
            )}
        </>
    );
};

export default WebsiteLayout;
