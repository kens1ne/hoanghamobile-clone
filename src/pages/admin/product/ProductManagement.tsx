import React, { useState } from 'react';
import { Space, Table, Button, Card, Image, Input } from 'antd';
import { IProduct } from '../../../types/product';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

interface DataType {
    key: string;
    name: string;
    price: number;
}
interface IProps {
    products: IProduct[];
    onRemove: (id: string) => void;
}
const ProductManagementPage = (props: IProps) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const removeProduct = (id: string) => {
        props.onRemove(id);
    };

    const data = props.products
        .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((item) => {
            return {
                key: item._id,
                name: item.name,
                price: item.price,
                image: <Image width={50} src={item.images[0]} />,
            };
        });

    const columns: ColumnsType<DataType> = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'Product Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button type="primary" style={{ backgroundColor: '#9058cc' }}>
                        <Link to={`/admin/products/${record.key}/update`}>Edit</Link>
                    </Button>
                    <Button type="primary" danger onClick={() => removeProduct(record.key)}>
                        Remove
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Card
            title="Danh sách sản phẩm"
            style={{ width: '70%', margin: '0 auto' }}
            extra={
                <Link to="/admin/products/add">
                    <Button type="primary" style={{ backgroundColor: '#9058cc' }}>
                        Add Product
                    </Button>
                </Link>
            }
        >
            <Space style={{ marginBottom: 16 }}>
                <Input.Search placeholder="Search product" onChange={(event) => setSearchTerm(event.target.value)} />
            </Space>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 20, showQuickJumper: true }}
                size="small"
            />
        </Card>
    );
};

export default ProductManagementPage;
