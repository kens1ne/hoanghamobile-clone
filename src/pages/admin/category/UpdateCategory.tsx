import React, { useState, useEffect } from 'react';
import { ICategory } from '../../../types/category';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Space, Button, Card, Form, Input, message } from 'antd';
import { updateCategory } from '../../../api/category';
interface IProps {
    categories: ICategory[];
    setCategory: React.Dispatch<React.SetStateAction<ICategory[]>>;
}

const UpdateCategoryPage = ({ categories, setCategory }: IProps) => {
    const { id } = useParams();
    const [currentCategory, setCurrentCategory] = useState<ICategory>();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    useEffect(() => {
        setCurrentCategory(categories.find((item) => item._id === id));
    }, [categories]);

    useEffect(() => {
        form.setFieldsValue({
            name: currentCategory?.name,
        });
    }, [currentCategory]);

    const onFinish = (values: { name: string }) => {
        updateCategory({ ...currentCategory, ...values })
            .then(({ data: { data } }) => {
                setCategory(categories.map((item) => (item._id === data._id ? data : item)));
            })
            .then(() => {
                message.success(`Sửa danh mục thành công`);
                navigate('/admin/categories');
            });
    };

    console.log('re-render');

    return (
        <div>
            <Card title="Sửa danh mục" style={{ width: '70%', margin: '0 auto' }}>
                <Form
                    form={form}
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
                        <Button type="primary" htmlType="submit" danger>
                            Sửa
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default UpdateCategoryPage;
