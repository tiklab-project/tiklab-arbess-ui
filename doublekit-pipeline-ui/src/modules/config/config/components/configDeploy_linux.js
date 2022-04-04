import React,{Fragment} from 'react'
import {Button, Form, Input, Row, Select} from "antd";

const {Option}=Select
const { TextArea } = Input;

const ConfigDeploy_linux = props =>{

    const {setVisible,findAllDeployProof,findOneDeployProof,allDeployProofList} = props

    const findAllDeploy = () =>{
        findAllDeployProof()
    }

    const deploySelect = value =>{
        findOneDeployProof(value)
    }
    return(
        <Fragment>
            <Form.Item name='deployTargetAddress' label='需要发送的文件地址'>
                <Input/>
            </Form.Item>
            <Row>
                <Form.Item  name='deployPlace'  label='请选择Ip地址' >
                    <Select
                        onChange={deploySelect}
                        onClick={findAllDeploy}
                        style={{ width: 300 }}
                    >
                        <Option >
                            无
                        </Option>
                        {
                            allDeployProofList && allDeployProofList.map(item=>{
                                return(
                                    <Option key={item.proofId} value= { item.proofName+ " (" + item.proofIp + ")"}>
                                        { item.proofName+ " (" + item.proofIp + ")"}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Button onClick={()=>setVisible(true)} className='config-link'>
                    添加
                </Button>
            </Row>

            <Form.Item name='deployAddress' label='部署位置'>
                <Input/>
            </Form.Item>
            <Form.Item name='deployShell' label='shell命令'>
                <TextArea autoSize/>
            </Form.Item>
        </Fragment>
    )
}
export default ConfigDeploy_linux