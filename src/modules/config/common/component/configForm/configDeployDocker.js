import React,{Fragment} from "react";
import {Form,Input} from "antd";

const ConfigDeployDocker = props =>{

    const validate = (rule,value) =>{
        if (!value) {
            return Promise.resolve();
        } else if (value< 3000) {
            return Promise.reject("最小3000");
        } else if (value > 30000) {
            return Promise.reject("最大30000");
        } else if (!/^\d+$|^\d+[.]?\d+$/.test(value)) {
            return Promise.reject("只能输入数字");
        } else {
            return Promise.resolve(); //验证通过
        }
    }

    return(
        <Fragment>
            <Form.Item
                name="dockerPort"
                label="启动端口"
                rules={[
                    {required:true, message:"请输入启动端口"},
                    {validator: validate}
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="mappingPort"
                label="映射端口"
                rules={[
                    {required:true, message:"请输入映射端口"},
                    {validator: validate}
                ]}
            >
                <Input/>
            </Form.Item>
        </Fragment>
    )
}

export default ConfigDeployDocker

