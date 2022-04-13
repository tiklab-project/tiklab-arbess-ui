import React from "react";
import {Form,Input} from "antd";

const {TextArea} = Input

const PracticeRight_test = props =>{
    return(
        <Form.Item name="testOrder">
            <TextArea  autoSize  />
        </Form.Item>
    )
}

export default PracticeRight_test