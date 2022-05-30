import React, {Fragment, useState} from "react";
import {Button, Form, Input, Row, Select} from "antd";
import {inject, observer} from "mobx-react";
import ConfigDeployAddProofModal from "./configDeployAddProofModal";
import Mirror from "./mirror";
const {Option}=Select

const ConfigDeployLinux = props =>{
  
    const {proofStore,configDataStore} = props
    const {createProof,findAllProof} = proofStore

    const {setIsPrompt,linuxShellBlock,setLinuxShellBlock} = configDataStore

    const [allLinuxProofList,setAllLinuxProofList] = useState([])
    const [deployVisible,setDeployVisible] = useState(false)

    const clickFindAllDeploy = () =>{
        findAllProof(31).then(res=>{
            console.log('linux凭证',res)
            setAllLinuxProofList(res.data)
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
                <Input  placeholder="请输入需要发送的文件模块名以及文件后缀名"/>
            </Form.Item>
            <Row>
                <Form.Item name='dockerProofName' label='请选择Ip地址'>
                    <Select 
                        style={{width:300}}
                        onChange={(value,e)=>changeDeploySelect(value,e)}
                        onClick={clickFindAllDeploy}
                    >
                        {
                            allLinuxProofList && allLinuxProofList.map(item=>{
                                return(
                                    <Option key={item.proofId} value={ item.proofName+ " (" + item.proofIp + ")"}>
                                        { item.proofName+ " (" + item.proofIp + ")"}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Button className='config-details-link' onClick={()=>setDeployVisible(true)}>
                    添加
                </Button>
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
                    autoSize
                    shellBlock={linuxShellBlock}
                    setShellBlock={setLinuxShellBlock}
                    setIsPrompt={setIsPrompt}
                />
            </Form.Item>
            <ConfigDeployAddProofModal
                deployVisible={deployVisible}
                setDeployVisible={setDeployVisible}
                createProof={createProof}
            />
        </Fragment>
    )
}

export default inject('proofStore','configDataStore')(observer(ConfigDeployLinux))


