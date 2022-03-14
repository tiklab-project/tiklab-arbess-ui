import React,{useState,useEffect} from "react";
import {Button, Form, Input, Select} from "antd";
import ConfigDetailsDeployAddModal from "./configDetailsDeployAddModal";

const {Option}=Select
const { TextArea } = Input;

const ConfigDetailsDeploy = props =>{

    const {createDeployProof,findAllDeployProof,findOneDeployProof,allDeployProof,deployProofName}=props

    const [visible,setVisible]=useState(false)

    const onCreate  = values =>{
        let params = {
            proofScope:2,
            proofUsername:values.proofUsername,
            proofPassword:values.proofPassword,
            proofPort:values.proofPort,
            proofDescribe:values.proofDescribe,
        }
        createDeployProof(params)
        setVisible(false)
    }

    const findAllDeploy = () =>{
        findAllDeployProof()
    }

    const deploySelect = value=>{
        findOneDeployProof(value)
        localStorage.setItem('deployProofId',value)
    }

    return(
        <div className=' anchor-content'>
            <h2>部署</h2>
            <Form.Item name={'configureTargetAddress'} label='请输入文件地址'>
                <Input  placeholder="请输入需要发送的文件模块名以及文件后缀名"/>
            </Form.Item>
            <Form.Item  label='请选择Ip地址'>
                <Select
                    onChange={deploySelect}
                    onClick={findAllDeploy}
                    style={{ width: 300 }}
                    defaultValue={localStorage.getItem('oneDeployProof')}
                >
                    {
                        allDeployProof && allDeployProof.map(item=>{
                            return(
                                <Option key={item.proofId}>
                                    { item.proofName+ "(" + item.proofIp + ")"}
                                </Option>
                            )
                        })
                    }
                </Select>
                &nbsp;  &nbsp;
                <Button onClick={()=>setVisible(true)}>
                    添加
                </Button>
            </Form.Item>
            <Form.Item name={'configureDeployAddress'} label='部署位置'>
                <Input/>
            </Form.Item>
            <Form.Item name={'configureShell'} label='shell命令'>
                <TextArea autoSize />
            </Form.Item>

            <ConfigDetailsDeployAddModal
                visible={visible}
                onCreate={onCreate}
                onCancel={()=>setVisible(false)}
                okText="确认"
                cancelText="取消"
            />
        </div>
    )
}

export default ConfigDetailsDeploy