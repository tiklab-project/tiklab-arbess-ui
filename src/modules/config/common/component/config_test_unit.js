import React from "react";
import {Form,Input} from "antd";

const {TextArea} = Input

const Config_test_unit = props =>{
    return(
        <Form.Item name="testOrder">
            <TextArea  autoSize  />
        </Form.Item>
    )
}

export default Config_test_unit