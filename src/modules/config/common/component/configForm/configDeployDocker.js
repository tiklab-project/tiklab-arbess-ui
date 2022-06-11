import React, {Fragment, useState} from "react";
import {Button, Form, Input, message, Row, Select} from "antd";
import {inject, observer} from "mobx-react";
import ConfigDeployAddProofModal from "./configDeployAddProofModal";

const {Option}=Select

const ConfigDeployDocker = props =>{

    const {proofStore,configStore,configDataStore} = props
    const {createProof,findAllProof} = proofStore
    const {codeTestPass} = configStore
    const {formInitialValues} = configDataStore

    const [allDockerProofList,setAllDockerProofList] = useState([])
    const [deployVisible,setDeployVisible] = useState(false)


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

    const clickFindAllDeploy = () =>{
        findAllProof(32).then(res=>{
            console.log('docker凭证',res)
            setAllDockerProofList(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    const changeDeploySelect = (value,e) =>{
        localStorage.setItem('deployProofId',e.key)
    }

    const test = () => {
        const params = {
            proofId:localStorage.getItem('gitProofId'),
            url:formInitialValues && formInitialValues.ip,
            port:formInitialValues && formInitialValues.port,
        }
        codeTestPass(params).then(res=>{
            if(res.data === true){
                message.success({content: '连接成功', className:'message'})
            }else {
                message.error({content:'连接失败', className:'message'})
            }
        })
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
                <Form.Item name='dockerProofName' label='凭证'>
                    <Select 
                        style={{ width: 300 }}
                        onChange={(value,e)=>changeDeploySelect(value,e)}
                        onClick={clickFindAllDeploy}
                    >
                        {
                            allDockerProofList && allDockerProofList.map(item=>{
                                return(
                                    <Option key={item.proofId} value={item.proofName+ " (" + item.proofUsername + ")"} >
                                        { item.proofName+ " (" + item.proofUsername + ")"}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Button onClick={()=>setDeployVisible(true)} className='config-details-link'>
                    添加
                </Button>
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
            <div className='config-details-gitTest'>
                <Button onClick={()=>test()}>连接测试</Button>
            </div>
            <ConfigDeployAddProofModal
                deployVisible={deployVisible}
                setDeployVisible={setDeployVisible}
                createProof={createProof}
            />
        </Fragment>
    )
}

export default inject('proofStore','configStore','configDataStore')
                (observer(ConfigDeployDocker))

