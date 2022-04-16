import React from "react";
import {Form,Input} from "antd";

const {TextArea} = Input

const ConfigDetails_test = props =>{
    return(
        <Form.Item name="testOrder">
            <TextArea  autoSize  />
        </Form.Item>
    )
}

export default ConfigDetails_test