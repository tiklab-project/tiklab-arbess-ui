import React,{Fragment} from "react";
import {Form, Input} from "antd";

const {TextArea} =Input

const PracticeRight_node = props =>{

    return(
        <Fragment>
            <Form.Item name="nodeAddress" label="文件地址">
                <Input />
            </Form.Item>
            <Form.Item name="nodeOrder" label="执行命令">
                <TextArea  autoSize/>
            </Form.Item>
        </Fragment>
    )
}

export default PracticeRight_node
