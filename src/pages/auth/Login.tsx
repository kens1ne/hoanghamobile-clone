import React, { useState } from 'react';
import { Button, Form, Input, Alert, Card, Typography, message } from 'antd';
import { handleLogin } from '../../api/auth';
import { Link } from 'react-router-dom';
const { Title } = Typography;

const Login = () => {
    const onFinish = (data: { username: string; password: string }) => {
        handleLogin(data)
            .then(({ data }: any) => {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('userInfo', JSON.stringify(data.user));
                message.success(data.message);
            })
            .then(() => {
                window.location.href = '/';
            })
            .catch((error) => {
                error.response.data.message
                    ? message.error(error.response.data.message)
                    : message.error('Lỗi không xác định');
            });
    };

    return (
        <Card size="small" style={{ margin: '5vh auto', width: 500 }} className="login-bg">
            <Title level={2} style={{ textAlign: 'center', marginTop: 50 }}>
                Login
            </Title>
            <Form name="basic" labelCol={{ span: 5 }} onFinish={onFinish} autoComplete="off">
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

                <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                    <Button type="primary" danger>
                        <Link to="/auth/register">Register</Link>
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Login;
