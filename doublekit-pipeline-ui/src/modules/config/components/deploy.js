import React ,{useState} from "react";
import {Form, Input, Select, Button} from "antd";
import DeployAddModal from "./deployAddModal";

const {Option}=Select
const { TextArea } = Input;

const Deploy = props =>{

    const {createProof,findOneDeployProof,findAllDeployProof,allDeployProofList}=props

    const [visible,setVisible]=useState(false)

    const onCreate  = values =>{
        let params = {
            proofScope:2,
            proofUsername:values.proofUsername,
            proofPassword:values.proofPassword,
            proofPort:values.proofPort,
            proofDescribe:values.proofDescribe,
        }
        createProof(params)
        setVisible(false)
    }

    const findAllDeploy = () =>{
        findAllDeployProof()
    }

    const deploySelect = value =>{
        findOneDeployProof(value)
        localStorage.setItem('deployProofId',value)
    }

    return(
        <div className=' anchor-content'>
            <h1>部署</h1>
            <Form.Item name={'configureTargetAddress'} label='需要发送的文件地址'>
                <Input/>
            </Form.Item>
            <Form.Item  label='请选择Ip地址'>
                <Select
                    onChange={deploySelect}
                    onClick={findAllDeploy}
                    style={{ width: 300 }}
                >
                    {
                        allDeployProofList && allDeployProofList.map(item=>{
                            return(
                                <Option key={item.proofId}>
                                    { item.proofName+ "(" + item.proofIp + ")"}
                                </Option>
                            )
                        })
                    }
                </Select>
                &nbsp;&nbsp;
                <Button onClick={()=>setVisible(true)}>
                    添加
                </Button>
            </Form.Item>
            <Form.Item name={'configureDeployAddress'} label='部署位置'>
                <Input/>
            </Form.Item>
            <Form.Item name={'configureShell'} label='shell命令'>
                <TextArea autoSize/>
            </Form.Item>

            <DeployAddModal
                visible={visible}
                onCreate={onCreate}
                onCancel={()=>setVisible(false)}
                okText="确认"
                cancelText="取消"
            />
        </div>
    )
}

export default Deploy