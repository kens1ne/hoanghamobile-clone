import { Card, Col, Row, Typography } from 'antd';
import React from 'react';
import { ICategory } from '../../types/category';
import { IProduct } from '../../types/product';
const { Title } = Typography;
interface IProps {
    categories: ICategory[];
    products: IProduct[];
}
const AdminPage = ({ categories, products }: IProps) => {
    return (
        <div style={{ width: '70%', margin: '0 auto' }}>
            <Title level={4}>Thống kê</Title>
            <Row>
                <Col className="gutter-row" span={12} style={{ padding: 5 }}>
                    <Card>
                        <Title>{categories.length}</Title>

                        <p>Danh mục</p>
                    </Card>
                </Col>
                <Col className="gutter-row" span={12} style={{ padding: 5 }}>
                    <Card>
                        <Title>{products.length}</Title>

                        <p>Sản phẩm</p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AdminPage;
