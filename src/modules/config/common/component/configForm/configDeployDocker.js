import React, {Fragment, useState} from "react";
import {Button, Form, Input, Row, Select} from "antd";
import {inject, observer} from "mobx-react";
import ConfigDeployAddProofModal from "./configDeployAddProofModal";

const {Option}=Select

const ConfigDeployDocker = props =>{

    const {proofStore,configStore} = props
    const {createProof,findAllProof} = proofStore
    const {deployTestPass} = configStore

    const [allDockerProofList,setAllDockerProofList] = useState([])
    const [deployVisible,setDeployVisible] = useState(false)

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

    return(
        <Fragment>
            <Form.Item
                name='deployTargetAddress'
                label='请输入文件地址'
                rules={[{required:true, message:'请输入文件地址'}]}
            >
                <Input/>
            </Form.Item>
            <Row>
                <Form.Item name='dockerProofName' label='请选择Ip地址'>
                    <Select 
                        style={{ width: 300 }}
                        onChange={(value,e)=>changeDeploySelect(value,e)}
                        onClick={clickFindAllDeploy}
                    >
                        {
                            allDockerProofList && allDockerProofList.map(item=>{
                                return(
                                    <Option key={item.proofId} value={item.proofName+ " (" + item.proofIp + ")"} >
                                        { item.proofName+ " (" + item.proofIp + ")"}
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
                    {required:true, message:'请输入启动端口'},
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

            <ConfigDeployAddProofModal
                deployVisible={deployVisible}
                setDeployVisible={setDeployVisible}
                createProof={createProof}
                deployTestPass={deployTestPass}
            />
        </Fragment>
    )
}

export default inject('proofStore','configStore')
                (observer(ConfigDeployDocker))

