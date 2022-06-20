import React, {Fragment} from "react";
import { Form, Input, Row} from "antd";
import {inject, observer} from "mobx-react";
import Mirror from "./mirror";
import AddProofButton from "../../../../proof/components/addProofButton";
import FormTest from "./formTest";
import FindAllProof from "../../../../proof/components/findAllProof";


const ConfigDeployLinux = props =>{
  
    const {configDataStore} = props
    const {setIsPrompt,linuxShellBlock,setLinuxShellBlock} = configDataStore

    const deployProofId = localStorage.getItem('deployProofId')

    const validate = (rule,value) =>{
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

    return(
        <Fragment>
            <Form.Item
                name='deployTargetAddress'
                label='请输入文件地址'
                rules={[{required:true, message:'请输入文件地址'}]}
            >
                <Input  placeholder="请输入需要发送的文件模块名以及文件后缀名"/>
            </Form.Item>
            <Form.Item
                label='Ip地址'
                name='ip'
                rules={[
                    {required:true, message:'输入IpV4地址'},
                    {
                        pattern:/((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)/,
                        message:'请输入正确的IpV4地址'
                    },
                ]}
                style={{ display: 'inline-block',  margin: '3px 3px' }}
            >
                <Input  placeholder='输入IpV4地址' style={{width:200}}/>
            </Form.Item>
            <Form.Item
                label='端口号'
                name='port'
                rules={[{validator: validate},{required:true, message:'请输入端口号'}]}
                style={{ display: 'inline-block',  margin: '3px 3px' }}
            >
                <Input placeholder="输入端口号"  style={{width:150}}/>
            </Form.Item>
            <Row>
                <FindAllProof type={31}/>
                <AddProofButton codeType={31}/>
            </Row>
            <Form.Item
                name='deployAddress'
                label='部署位置'
                rules={[{required:true, message:'请输入部署位置'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item name='deployShell' label='shell命令'>
                <Mirror
                    shellBlock={linuxShellBlock}
                    setShellBlock={setLinuxShellBlock}
                    setIsPrompt={setIsPrompt}
                />
            </Form.Item>
            <FormTest />
        </Fragment>
    )
}

export default inject('configDataStore')(observer(ConfigDeployLinux))


