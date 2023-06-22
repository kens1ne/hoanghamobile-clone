import React, { useEffect, useState } from 'react';
import { IProduct } from '../../../types/product';
import { Button, Card, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import { ICategory } from '../../../types/category';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';

interface IProps {
    categories: ICategory[];
    onAdd: (product: IProduct) => void;
}
const { TextArea } = Input;
const { Dragger } = Upload;

const AddProductPage = (props: IProps) => {
    const [images, setImage] = useState<string[]>([]);
    const onFinish = (values: any) => {
        const { dragger, ...rest } = values;
        props.onAdd({ ...rest, images: images });
    };
    const handleUpload = (values: any) => {
        message.success(`Up ảnh thành công.`);
        setImage([...images, values.data.url]);
    };

    const normFile = (e: any) => {
        e.file.status = 'done';
        return e?.fileList;
    };

    return (
        <div>
            <Card title="Thêm danh mục" style={{ width: '70%', margin: '0 auto' }}>
                <Form style={{ width: '100%' }} labelCol={{ span: 3 }} onFinish={onFinish}>
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
                        <InputNumber min={0} />
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
                                multiple={true}
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Add New Product
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default AddProductPage;
