import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { IProduct } from '../../../types/product';
import { Button, Card, Form, Input, Select, Upload, message } from 'antd';
import { ICategory } from '../../../types/category';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Image } from 'antd';

interface IProps {
    onUpdate: (data: IProduct) => void;
    products: IProduct[];
    categories: ICategory[];
}
const { TextArea } = Input;

const UpdateProductPage = (props: IProps) => {
    const [currentProduct, setCurrentProduct] = useState<IProduct>();
    const [newImageList, setNewImageList] = useState<string[]>([]);
    const [isUpload, setIsUpload] = useState<boolean>(false);
    const { id } = useParams(); // lấy id từ url
    const [form] = Form.useForm();

    useEffect(() => {
        setCurrentProduct(props.products.find((item) => item._id === id)); // tìm product có id trùng với id trong url
    }, [props]);

    const onFinish = (data: any) => {
        const { dragger, ...products } = data;
        if (isUpload) {
            props.onUpdate({ ...currentProduct, ...products, images: newImageList });
        } else {
            props.onUpdate({ ...currentProduct, ...products });
        }
    };

    const handleUpload = (values: any) => {
        setNewImageList([...newImageList, values.data.url]);
    };

    const handleUploadChange = (values: File) => {
        setIsUpload(true);
    };
    const normFile = (e: any) => {
        e.file.status = 'done';
        return e?.fileList;
    };

    useEffect(() => {
        form.setFieldsValue({
            name: currentProduct?.name,
            price: currentProduct?.price,
            description: currentProduct?.description,
            categoryId: currentProduct?.categoryId,
        });
    }, [currentProduct]);

    return (
        <div>
            <Card title="Sửa" style={{ width: '70%', margin: '0 auto' }}>
                <Form form={form} style={{ width: '100%' }} labelCol={{ span: 3 }} onFinish={onFinish}>
                    <Form.Item
                        label="Product Name"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng điền tên sản phẩm!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Product Price"
                        name="price"
                        rules={[{ required: true, message: 'Vui lòng điền giá sản phẩm!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label="Danh mục" name="categoryId">
                        <Select>
                            {props.categories.map((category) => {
                                return (
                                    <Select.Option value={category._id} key={category._id}>
                                        {category.name}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Dragger">
                        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                            <Upload.Dragger
                                name="image"
                                action="https://api.imgbb.com/1/upload?key=125c7f00022fa6f17871d0e7f5e7a238"
                                onSuccess={handleUpload}
                                onChange={handleUploadChange}
                                multiple={true}
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Upload.Dragger>
                        </Form.Item>
                        {isUpload ? (
                            ''
                        ) : (
                            <Form.Item style={{ display: 'flex', marginTop: 30 }}>
                                {currentProduct?.images.map((product, index) => {
                                    return <Image key={index} width={200} height={200} src={product} />;
                                })}
                            </Form.Item>
                        )}
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Update Products
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default UpdateProductPage;
