import React from "react";
import { Form, Input} from "antd";
import {ApiOutlined} from "@ant-design/icons";

const New=(props)=>{
    const  onFinish=()=>{}
    return(
        <div className='new'>
            <div className='new-content'>
                <Form
                    name="basic"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="流水线名称"
                        name="assemblyName"
                        rules={[{ required: true, message: '请输入流水线名称' }]}
                    >
                        <Input style={{width:400}}/>
                    </Form.Item>
                </Form>
                <div className='new-content-bottom'>
                    <h1 onClick={()=>{props.history.push('/home/deployment')}}  style={{ cursor: "pointer" }}>
                        <ApiOutlined />流水线
                    </h1>
                    <p>
                        精心地组织一个可以长期运行在多个节点上的任务。适用于构建流水线（更加正式地应当称为工作流），增加或者组织难以采用自由风格的任务类型。
                    </p>
                </div>
            </div>
        </div>
    )
}
export default New