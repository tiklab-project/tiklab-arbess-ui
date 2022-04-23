import React, {Fragment} from "react";
import {Button, Form, Input, Row, Select} from "antd";

const {Option}=Select
const { TextArea } = Input;

const Config_deploy_linux = props =>{
  
    const {setDeployVisible,findAllDeployProof,allDeployProofList} = props

    const clickFindAllDeploy = () =>{
        findAllDeployProof()
    }

    const changeDeploySelect = value =>{
        localStorage.setItem('deployProofId',value)
    }

    return(
        <Fragment>
            <Form.Item name='linuxTargetAddress' label='请输入文件地址'>
                <Input  placeholder="请输入需要发送的文件模块名以及文件后缀名"/>
            </Form.Item>
            <Row>
                <Form.Item name='linuxProofName' label='请选择Ip地址'>
                    <Select 
                        style={{width:300}}
                        onChange={changeDeploySelect}
                        onClick={clickFindAllDeploy}
                    >
                        <Option >
                            无
                        </Option>
                        {
                            allDeployProofList && allDeployProofList.map(item=>{
                                return(
                                    <Option key={item.proofId} value={item.proofId} >
                                        { item.proofDescribe+ " (" + item.proofIp + ")"}
                                    </Option>
                                )
                            })
                        }

                    </Select>
                </Form.Item>
                <Button
                    onClick={()=>setDeployVisible(true)}
                    className='config-details-link'
                >
                    添加
                </Button>
            </Row>
            <Form.Item name='linuxAddress' label='部署位置'>
                <Input/>
            </Form.Item>
            <Form.Item name='deployShell' label='shell命令'>
                <TextArea autoSize/>
            </Form.Item>
        </Fragment>
    )
}

export default Config_deploy_linux

