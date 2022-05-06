import React, {Fragment, useState} from "react";
import {Button, Form, Input, Row, Select} from "antd";
import {inject, observer} from "mobx-react";

const {Option}=Select

const Config_deploy_docker = props =>{

    const {setDeployVisible,ProofStore} = props
    const {findAllProof} = ProofStore

    const [allDockerProofList,setAllDockerProofList] = useState([])

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
        const param = {
            type :2
        }
        findAllProof(param).then(res=>{
            console.log('docker凭证',res)
            setAllDockerProofList(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    const changeDeploySelect = value =>{
        localStorage.setItem('deployProofId',value)
    }

    return(
        <Fragment>
            <Form.Item name='dockerTargetAddress' label='请输入文件地址'>
                <Input/>
            </Form.Item>
            <Row>
                <Form.Item name='dockerProofName' label='请选择Ip地址'>
                    <Select 
                        style={{ width: 300 }}
                        onChange={changeDeploySelect}
                        onClick={clickFindAllDeploy}
                    >
                        <Option >
                            无
                        </Option>
                        {
                            allDockerProofList && allDockerProofList.map(item=>{
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
            <Form.Item
                name='dockerPort'
                label='启动端口'
                style={{ display: 'inline-block'}}
                rules={[
                    {
                        validator: validate,
                    },
                ]}
            >
                <Input style={{width:200}}/>
            </Form.Item>
            <Form.Item
                name='mappingPort'
                label='映射端口'
                style={{ display: 'inline-block',  margin: '1px 3px' }}
                rules={[
                    {
                        validator: validate,
                    },
                ]}
            >
                <Input style={{width:200}}/>
            </Form.Item>
            <Form.Item name='dockerAddress' label='部署位置'>
                <Input/>
            </Form.Item>

        </Fragment>
    )
}

export default inject('ProofStore')(observer(Config_deploy_docker))

