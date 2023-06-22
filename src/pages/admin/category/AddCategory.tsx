import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Alert, Space, Button, Card, Form, Input, message } from 'antd';
import { addCategory } from '../../../api/category';
import { useNavigate } from 'react-router-dom';
import { ICategory } from '../../../types/category';

interface IProps {
    categories: ICategory[];
    setCategory: React.Dispatch<React.SetStateAction<ICategory[]>>;
}

const AddCategory = ({ categories, setCategory }: IProps) => {
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        addCategory(values)
            .then(({ data }) => {
                setCategory([...categories, data.data]);
                message.success(`Thêm danh mục thành công`);
            })
            .then(() => {
                navigate('/admin/categories');
            })
            .catch((error) => message.error(error.message));
    };

    return (
        <div>
            <Card title="Thêm danh mục" style={{ width: '70%', margin: '0 auto' }}>
                <Form
                    name="basic"
                    style={{ width: '100%' }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên danh mục"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng điền tên sản phẩm!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Thêm
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default AddCategory;
