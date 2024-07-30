import React from "react";
import {Form,Input,Select} from "antd";

/**
 * 认证类型 表单
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const AuthType = props =>{

    return(
        <>
            <Form.Item label="认证类型" name="authType">
                <Select placeholder={'认证类型'}>
                    <Select.Option value={1}>username&password</Select.Option>
                    <Select.Option value={2}>私钥</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item shouldUpdate={(prevValues, currentValues) =>
                    prevValues.authType !== currentValues.authType}
            >
                {({getFieldValue}) =>
                    getFieldValue("authType")===1 ?
                        <>
                            <Form.Item
                                label="用户名"
                                name="username"
                                rules={[{required:true,message:"请输入用户名"}]}
                            ><Input placeholder={'用户名'}/>
                            </Form.Item>
                            <Form.Item
                                label="密码"
                                name="password"
                                rules={[{required:true,message:"请输入密码"}]}
                            ><Input.Password placeholder={'密码'}/>
                            </Form.Item>
                        </>
                        :
                        <Form.Item
                            label="私钥"
                            name="privateKey"
                            rules={[{required:true,message:"请输入私钥"}]}
                        ><Input.TextArea autoSize={{minRows: 2, maxRows: 8}} placeholder={'私钥'}/>
                        </Form.Item>
                }
            </Form.Item>
        </>
    )
}

export default AuthType
