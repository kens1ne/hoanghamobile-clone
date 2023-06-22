import React, { useEffect, useState } from 'react';
import { Image, Typography, Button } from 'antd';
import { IProduct } from '../types/product';
import { Link, useParams } from 'react-router-dom';
interface IProps {
    products: IProduct[];
}
const { Paragraph } = Typography;

const ProductDetail = ({ products }: IProps) => {
    const [currentProduct, setCurrentProduct] = useState<IProduct>();
    const { id } = useParams();

    useEffect(() => {
        setCurrentProduct(products.find((item) => item._id === id));
    }, [products]);

    useEffect(() => {
        if (currentProduct) {
            document.title = currentProduct.name;
        }
    }, [currentProduct]);

    return (
        <div className="container">
            <div className="name">
                <h1>{currentProduct?.name}</h1>
            </div>
            <div className="info">
                <div className="image-product">
                    <img src={currentProduct?.images[0]} alt="" className="w-full" />
                </div>
                <div className="detail">
                    <h2 className="price">{currentProduct?.price} ₫</h2>
                    <div className="shipping uppercase">MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC</div>
                    <div className="select-color">
                        <div className="color">
                            <button>Đen</button>
                        </div>
                    </div>
                    <div className="promote">
                        <h2 className="uppercase">Khuyến mãi</h2>
                        <div className="item">
                            <div className="bag">KM1</div>
                            Giảm thêm tới 500.000đ khi thanh toán qua VNPAY - (Xem chi tiết)
                        </div>
                        <div className="item">
                            <div className="bag">KM2</div>
                            Giảm thêm tới 500.000đ khi thanh toán qua VNPAY - (Xem chi tiết)
                        </div>
                        <div className="item">
                            <div className="bag">KM3</div>
                            Giảm thêm tới 500.000đ khi thanh toán qua VNPAY - (Xem chi tiết)
                        </div>
                        <div className="item">
                            <div className="bag">KM4</div>
                            Giảm thêm tới 500.000đ khi thanh toán qua VNPAY - (Xem chi tiết)
                        </div>
                    </div>
                    <div className="payments">
                        <Link to="#" className="buynow">
                            Mua ngay
                        </Link>
                        <Link to="#" className="installment">
                            Trả góp
                        </Link>
                    </div>
                </div>
                <div className="baohanh">
                    <div className="thongtin">
                        <h2 className="uppercase">Thông tin bảo hành</h2>
                        <span>Bảo hành 12 tháng chính hãng</span>
                        <span>Bao xài lỗi 1 đổi 1 trong 30 ngày với lỗi phần cứng do nhà sản xuất.</span>
                    </div>
                </div>
            </div>
            <div className="description">
                <h2>{currentProduct?.name}</h2>
                <p>{currentProduct?.description}</p>
            </div>
        </div>
    );
};

export default ProductDetail;
