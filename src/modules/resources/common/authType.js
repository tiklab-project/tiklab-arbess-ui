import React,{useState,useEffect} from "react";
import {Form,Input,Select} from "antd";
import {inject,observer} from "mobx-react";

const AuthType = props =>{

    const {isWay,formValue,setPipelineAuth,authStore} = props

    const {findAllAuth,authList} = authStore

    const [authWay,setAuthWay] = useState(1) // 认证方式

    const changWay = value =>{
        setAuthWay(value)
    }

    const onfocus = () =>{
        findAllAuth()
    }
    
    const onchange = (value,e) => {
        setPipelineAuth(e.key)
    }

    return(
        <>
            <Form.Item name="authPublic" label="认证权限">
                <Select>
                    <Select.Option value={1}>全局</Select.Option>
                    <Select.Option value={2}>私有</Select.Option>
                </Select>
            </Form.Item>
            {
                isWay?
                    null
                    :
                    <Form.Item name="authWay" label="认证方式">
                        <Select onChange={changWay}>
                            <Select.Option value={1}>自定义</Select.Option>
                            <Select.Option value={2}>统一认证</Select.Option>
                        </Select>
                    </Form.Item>
            }
            {
                authWay===1 &&
                <>
                    <Form.Item label="授权类型" name="authType">
                        <Select>
                            <Select.Option value={1}>username&password</Select.Option>
                            <Select.Option value={2}>私钥</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        shouldUpdate={(prevValues, currentValues) =>
                            prevValues.authType !== currentValues.authType}
                    >
                        {({getFieldValue}) =>
                            getFieldValue("authType")===2 ?
                                <>
                                    <Form.Item
                                        label="用户名"
                                        name="username"
                                        rules={[{required:true,message:"请输入用户名"}]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        label="密码"
                                        name="password"
                                        rules={[{required:true,message:"请输入密码"}]}
                                    >
                                        <Input.Password/>
                                    </Form.Item>
                                </>
                                :
                                <Form.Item
                                    label="私钥"
                                    name="privateKey"
                                    rules={[{required:true,message:"请输入token"}]}
                                >
                                    <Input.TextArea/>
                                </Form.Item>
                        }
                    </Form.Item>
                </>
            }
            {
                authWay===2 &&
                <Form.Item
                    name="pipelineAuth"
                    label="选择认证"
                >
                    <Select
                        onFocus={onfocus}
                        onChange={(value,e)=>onchange(value,e)}
                    >
                        {
                            authList && authList.map(item=>{
                                return <Select.Option value={item.name} key={item.authId}>
                                    {item.name}
                                </Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>
            }
        </>
    )
}

export default inject("authStore")(observer(AuthType))