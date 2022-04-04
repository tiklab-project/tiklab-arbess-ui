import React ,{Fragment} from "react";
import {Form, Select,Input} from "antd";

const {Option} = Select

const ConfigEdtailsDeploy_docker = props=>{
    return(
        <Fragment>
            <Form.Item
                name='dockerAddress'
                label='部署文件地址'
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name='dockerIp'
                label='部署Ip'
            >
                <Select style={{ width: 300 }}>
                    <Option> 1111</Option>
                    <Option> 2222 </Option>
                </Select>
            </Form.Item>
            <Form.Item
                name='dockerJdk'
                label='DockerFile文件地址'
            >
                <Select   style={{ width: 300 }}>
                    <Option> 1111</Option>
                    <Option> 2222 </Option>
                </Select>
            </Form.Item>
        </Fragment>
    )
}

export default ConfigEdtailsDeploy_docker