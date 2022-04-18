import React from 'react'
import {Form, Input, Button, Card,} from 'antd';
import './login.scss'
import {LockOutlined, UserOutlined} from "@ant-design/icons";

const Login=(props)=>{
    const  onFinish=(values)=>{
        props.history.push('/home/pipeline')
    }
    const onReset=()=>{}
    return(
        <div className='login'>
            <Card  title="登录" extra={<a href="#">新用户注册</a>} style={{ width: 400 }}  className="login-form">
                <Form
                    name="normal_login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item  wrapperCol={{ offset: 4, span: 16 }}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                        <Button style={{marginLeft:100}} htmlType="button" onClick={onReset}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login