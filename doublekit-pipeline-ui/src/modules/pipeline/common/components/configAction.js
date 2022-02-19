import React from "react";
import {Form, Input } from "antd";

const ConfigAction=()=>{

    return(
        <div className=' anchor'>
            <h1>构建后操作</h1>
            <Form.Item name={'configureDeployAddress'} label='部署位置'>
                <Input/>
            </Form.Item>
        </div>
    )
}

export default ConfigAction