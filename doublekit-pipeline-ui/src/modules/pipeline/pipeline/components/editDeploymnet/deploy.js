import React from "react";
import {Form, Input,Checkbox } from "antd";

const Deploy=props=>{
    return(
        <div className=' anchor'>
            <h1>部署</h1>
            <Form.Item name={'configureDeployAddress'} label='部署位置'>
                <Input/>
            </Form.Item>
        </div>
    )
}

export default Deploy