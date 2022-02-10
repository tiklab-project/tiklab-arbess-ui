import React from "react";
import {Form, Input,Checkbox } from "antd";

const DeployNewDeployment=()=>{
    return(
        <div className=' anchor'>
            <h1>部署</h1>
            <Form
                layout="vertical"
            >
                <Form.Item
                    label='部署位置'
                >
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Checkbox >
                        Checkbox
                    </Checkbox>
                </Form.Item>
            </Form>
        </div>
    )
}

export default DeployNewDeployment