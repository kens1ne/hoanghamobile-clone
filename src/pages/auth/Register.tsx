import React, { useState } from 'react';
import { Button, Form, Input, Alert, Card, Typography, message } from 'antd';
import { handleRegister } from '../../api/auth';
import { IRegister } from '../../types/auth';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

const Register = () => {
    const navigate = useNavigate();

    const onFinish = (data: IRegister) => {
        handleRegister(data)
            .then(({ data }: any) => {
                message.success(data.message);
            })
            .then(() => {
                navigate('/auth/login');
            })
            .catch(({ response }) => {
                message.error(response.data.message);
            });
    };

    const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(e, 'I was closed.');
    };

    return (
        <Card size="small" style={{ margin: '5vh auto', width: 500 }}>
            <Title level={2} style={{ textAlign: 'center', marginTop: 50 }}>
                Register
            </Title>
            <Form name="basic" labelCol={{ span: 5 }} onFinish={onFinish} autoComplete="off">
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="RePassword"
                    name="confirmPassword"
                    rules={[{ required: true, message: 'Please input confirm password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Register;
