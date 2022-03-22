import React,{useState} from "react";
import {Button, Form, Input, Select} from "antd";
import DeployAddModal from "../../common/deployAddModal";
import {withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";

const {Option}=Select
const { TextArea } = Input;

const ConfigDetailsDeploy = props =>{

    const { ConfigStore,ProofStore} = props
    const {createProof,findAllDeployProof,findOneDeployProof,oneDeployProof,
        allDeployProofList}=ProofStore
    const { deployProofList } = ConfigStore

    const [visible,setVisible]=useState(false)

    const clickFindAllDeploy = () =>{
        findAllDeployProof()
    }

    const changeDeploySelect = value =>{
        findOneDeployProof(value)
        localStorage.setItem('deployProofId',value)
    }

    return(
        <div className='anchor-content' id='d'>
            <h2>部署</h2>
            <Form.Item name='configureTargetAddress' label='请输入文件地址'>
                <Input  placeholder="请输入需要发送的文件模块名以及文件后缀名"/>
            </Form.Item>
            <Form.Item  label='请选择Ip地址'>
                <Select
                    onChange={changeDeploySelect}
                    onClick={clickFindAllDeploy}
                    style={{ width: 300 }}
                    // defaultValue={deployProofList && (deployProofList.proofDescribe+ "(" + deployProofList.proofIp + ")")}
                 >
                    {
                        allDeployProofList && allDeployProofList.map(item=>{
                            return(
                                <Option key={item.proofId} value={item.proofId} >
                                    { item.proofDescribe+ "(" + item.proofIp + ")"}
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
            <Form.Item name='configureDeployAddress' label='部署位置'>
                <Input/>
            </Form.Item>
            <Form.Item name='configureShell' label='shell命令'>
                <TextArea autoSize />
            </Form.Item>

            <DeployAddModal
                visible={visible}
                setVisible={setVisible}
                createProof={createProof}
            />
        </div>
    )
}

export default withRouter(inject('ConfigStore','ProofStore')(observer(ConfigDetailsDeploy)))