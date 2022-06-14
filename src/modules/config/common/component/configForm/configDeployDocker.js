import React, {Fragment} from "react";
import { Form, Input, Row} from "antd";
import AddProofButton from "../../../../proof/component/addProofButton";
import FindAllProof from "../../../../proof/component/findAllProof";
import FormTest from "./formTest";

const ConfigDeployDocker = props =>{

    const deployProofId = localStorage.getItem('deployProofId')

    const proofPort = (rule,value) =>{
        if (!value) {
            return Promise.resolve();
        } else if (value< 1) {
            return Promise.reject("最小1");
        } else if (value > 10000) {
            return Promise.reject("最大10000");
        } else if (!/^\d+$|^\d+[.]?\d+$/.test(value)) {
            return Promise.reject("只能输入数字");
        } else {
            return Promise.resolve(); //验证通过
        }
    }

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
                name='deployTargetAddress'
                label='请输入文件地址'
                rules={[{required:true, message:'请输入文件地址'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label='Ip地址'
                name='ip'
                rules={[
                    {required:true, message:'请输入IpV4地址'},
                    {
                        pattern:/((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)/,
                        message:'请输入正确的Ip地址'
                    }
                ]}
                style={{ display: 'inline-block',  margin: '3px 3px' }}
            >
                <Input  placeholder='输入IpV4地址' style={{width:200}}/>
            </Form.Item>
            <Form.Item
                label='端口号'
                name='port'
                rules={[{validator: proofPort},{required:true, message:'请输入端口号'}]}
                style={{ display: 'inline-block',  margin: '3px 3px' }}
            >
                <Input placeholder="输入端口号"  style={{width:150}}/>
            </Form.Item>
            <Row>
                <FindAllProof type={32}/>
                <AddProofButton codeType={32}/>
            </Row>
            <Form.Item
                name='dockerPort'
                label='启动端口'
                style={{ display: 'inline-block'}}
                rules={[
                    {required:true, message:'请输入启动端口'},
                    {validator: validate}
                ]}
            >
                <Input style={{width:200}}/>
            </Form.Item>
            <Form.Item
                name='mappingPort'
                label='映射端口'
                style={{ display: 'inline-block',  margin: '1px 3px' }}
                rules={[
                    {required:true, message:'请输入映射端口'},
                    {validator: validate}
                ]}
            >
                <Input style={{width:200}}/>
            </Form.Item>

            <Form.Item
                name='deployAddress'
                label='部署位置'
                rules={[{required:true, message:'请输入部署位置'}]}
            >
                <Input/>
            </Form.Item>

            <FormTest proofId={deployProofId}/>
        </Fragment>
    )
}

export default ConfigDeployDocker

