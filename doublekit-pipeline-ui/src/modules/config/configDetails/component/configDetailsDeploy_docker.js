import React ,{Fragment,useState} from "react";
import {Form, Select, Input, Row, Button} from "antd";
import DeployAddModal from "../../common/component/deployAddModal";
import {inject, observer} from "mobx-react";

const {Option} = Select

const ConfigDetailsDeploy_docker = props=>{

    const {ProofStore}= props
    const {createProof,findAllDeployProof,findOneDeployProof,allDeployProofList} = ProofStore
    const [visible,setVisible]=useState(false)

    const clickFindAllDeploy = () =>{
        findAllDeployProof()
    }

    const changeDeploySelect = value =>{
        findOneDeployProof(value)
    }

    return(
        <Fragment>
            <Form.Item
                name='dockerTargetAddress'
                label='请输入文件地址'
            >
                <Input/>
            </Form.Item>
            <Row>
                <Form.Item name='dockerPlace' label='请选择Ip地址'>
                    <Select
                        onChange={changeDeploySelect}
                        onClick={clickFindAllDeploy}
                        style={{ width: 300 }}
                    >
                        <Option >
                            无
                        </Option>
                        {
                            allDeployProofList && allDeployProofList.map(item=>{
                                return(
                                    <Option key={item.proofId} value={ item.proofDescribe+ " (" + item.proofIp + ")"} >
                                        { item.proofDescribe+ " (" + item.proofIp + ")"}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Button onClick={()=>setVisible(true)} className='config-details-link'>
                    添加
                </Button>
            </Row>
            <Form.Item
                name='dockerAddress'
                label='部署位置'
            >
               <Input/>
            </Form.Item>
            <DeployAddModal
                visible={visible}
                setVisible={setVisible}
                createProof={createProof}
            />
        </Fragment>
    )
}

export default inject('ProofStore')(observer(ConfigDetailsDeploy_docker))
