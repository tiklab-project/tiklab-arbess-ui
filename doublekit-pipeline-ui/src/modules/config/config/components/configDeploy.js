import React ,{useState} from "react";
import {Form, Input, Select, Button, Row} from "antd";
import DeployAddModal from "../../common/component/deployAddModal";

const {Option}=Select
const { TextArea } = Input;

const ConfigDeploy = props =>{

    const {createProof,findOneDeployProof,findAllDeployProof,allDeployProofList}=props

    const [visible,setVisible]=useState(false)

    const findAllDeploy = () =>{
        findAllDeployProof()
    }

    const deploySelect = value =>{
        findOneDeployProof(value)
    }

    return(
        <div className='anchor-content' id='d'>
            <h1>部署</h1>
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
                                    <Option key={item.proofId} value= { item.proofName+ "(" + item.proofIp + ")"}>
                                        { item.proofName+ "(" + item.proofIp + ")"}
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

            <DeployAddModal
                visible={visible}
                setVisible={setVisible}
                createProof={createProof}
            />
        </div>
    )
}

export default ConfigDeploy