import React, {Fragment, useState} from "react";
import {Button, Form, Input, Row, Select} from "antd";
import {inject, observer} from "mobx-react";

const {Option}=Select
const { TextArea } = Input;

const Config_deploy_linux = props =>{
  
    const {setDeployVisible,ProofStore} = props
    const {findAllProof} = ProofStore

    const [allLinuxProofList,setAllLinuxProofList] = useState([])

    const clickFindAllDeploy = () =>{
        const param = {
            type :2
        }
        findAllProof(param).then(res=>{
            console.log('linux凭证',res)
            setAllLinuxProofList(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    const changeDeploySelect = value =>{
        localStorage.setItem('linuxProofId',value)
    }

    return(
        <Fragment>
            <Form.Item name='linuxTargetAddress' label='请输入文件地址'>
                <Input  placeholder="请输入需要发送的文件模块名以及文件后缀名"/>
            </Form.Item>
            <Row>
                <Form.Item
                    name='linuxProofName'
                    label='请选择Ip地址'
                >
                    <Select 
                        style={{width:300}}
                        onChange={changeDeploySelect}
                        onClick={clickFindAllDeploy}
                    >
                        <Option >
                            无
                        </Option>
                        {
                            allLinuxProofList && allLinuxProofList.map(item=>{
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
                    className='config-details-link'
                    onClick={()=>setDeployVisible(true)}
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

export default inject('ProofStore')(observer(Config_deploy_linux))


