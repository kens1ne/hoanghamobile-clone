import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Card, Input } from 'antd';
import { ICategory } from '../../../types/category';
import type { ColumnsType } from 'antd/es/table';
import { getCategories } from '../../../api/category';
import { Link } from 'react-router-dom';
import { deleteCategory } from '../../../api/category';

interface DataType {
    key: string;
    name: string;
}

interface IProps {
    categories: ICategory[];
    setCategory: React.Dispatch<React.SetStateAction<ICategory[]>>;
}

const CategoriesManagement = ({ categories, setCategory }: IProps) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const data = categories
        .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((item) => {
            return {
                key: item._id,
                name: item.name,
            };
        });

    const onHandleRemove = (id: string): void => {
        confirm('Bạn có muốn danh mục ?')
            ? deleteCategory(id).then(() => {
                  setCategory(categories.filter((item) => item._id !== id));
              })
            : '';
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button type="primary" style={{ backgroundColor: '#9058cc' }}>
                        <Link to={`/admin/categories/${record.key}/update`}>Edit</Link>
                    </Button>
                    <Button
                        type="primary"
                        danger
                        onClick={() => {
                            onHandleRemove(record.key);
                        }}
                    >
                        Remove
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Card
                title="Danh sách danh mục"
                style={{ width: '70%', margin: '0 auto' }}
                extra={
                    <Link to="/admin/categories/add">
                        <Button type="primary" style={{ backgroundColor: '#9058cc' }}>
                            Add Category
                        </Button>
                    </Link>
                }
            >
                <Space style={{ marginBottom: 16 }}>
                    <Input.Search
                        placeholder="Search category"
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                </Space>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 20, showQuickJumper: true }}
                    size="small"
                />
            </Card>
        </div>
    );
};

export default CategoriesManagement;
