import React,{Fragment} from "react";
import {Form, Input} from "antd";

const {TextArea} =Input

const ConfigStructureMaven = props =>{

    return(
        <Fragment>
            <Form.Item name="structureAddress" label="文件地址">
                <Input />
            </Form.Item>
            <Form.Item name="structureOrder" label="执行命令">
                <TextArea  autoSize/>
            </Form.Item>
        </Fragment>
    )
}

export default ConfigStructureMaven
