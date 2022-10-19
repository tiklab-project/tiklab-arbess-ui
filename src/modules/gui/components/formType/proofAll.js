import React,{useState,useContext} from "react";
import {getUser} from "tiklab-core-ui";
import {observer} from "mobx-react";
import {Form,Select,Divider} from "antd";
import TestContext from "../common/testContext";
import proofStore from "../../store/proofStore";
import ConfigStore from "../../store/ConfigStore";
import {PlusOutlined} from "@ant-design/icons";
import ProofAddModal from "./proofAddModal";

const {Option} = Select

const ProofAll = props =>{

    const {type}=props

    const context = useContext(TestContext)

    const {createProof,findPipelineProof,pipelineProofList} = proofStore
    const {updateConfigure} = ConfigStore
    const {setGitProofId,setDeployProofId} = context.configDataStore
    const {pipelineId} = context.pipelineStore
    const valueChange = context.valueChange
    const userId = getUser().userId

    const [visible,setVisible] = useState(false)

    const [open, setOpen] = useState(false)

    const clickFindAllGit = () =>{
        let proofScope
        if(type === 2 || type === 3 ){
            proofScope = type
        }else if(type > 6){
            proofScope = 5
        }else {
            proofScope = 1
        }
        const params ={
            pipelineId:pipelineId,
            type:proofScope,
            userId:userId
        }
        findPipelineProof(params)
    }

    const selectDropdownRender = (menu,type) => {
        if(type === 2||type===3){
            return null
        }else {
            return <>
                <Divider style={{ margin: '4px 0' }} />
                <div
                    style={{ padding:"4px 8px",cursor: "pointer"}}
                    onClick={() => {
                        setOpen(false)
                    }}
                >
                    <div onClick={()=>setVisible(true)}>
                        <PlusOutlined />&nbsp;&nbsp;添加
                    </div>
                    <ProofAddModal
                        createProof={createProof}
                        visible={visible}
                        setVisible={setVisible}
                        userId={userId}
                        type={type}
                        context={context}
                    />
                </div>
            </>
        }
    }

    const changeGitSelect = (value,e) =>{
        if(type < 6){
            setGitProofId(e.key)
        }else {
            setDeployProofId(e.key)
        }
        valueChange(e.key,"proofName",type)
        // const params = {
        //     pipelineId,
        //     taskType:type,
        //     pipelineTest: {proof:{proofId:e.key}},
        //     pipelineCode: {proof:{proofId:e.key}},
        //     pipelineBuild: {proof:{proofId:e.key}},
        //     pipelineDeploy: {proof:{proofId:e.key}},
        //     message:"update"
        // }
        // updateConfigure(params)
    }

    const style1 = {
        width:420
    }

    const style2 = {
        width:373
    }

    return(
        <Form.Item
            label="凭证"
            name={type < 6 ? "gitProofName" : "deployProofName"}
        >
            <Select
                    style={{ width: 300 }}
                    // style={type === 2 || type === 3 ? style2:style1}
                    onClick={clickFindAllGit}
                    onChange={(value,e)=>changeGitSelect(value,e)}
                    placeholder="请选择凭证"
                    open={open}
                    onDropdownVisibleChange={(visible) => setOpen(visible)}
                    dropdownRender={menu=> (
                        <>
                            {menu}
                            {selectDropdownRender(menu,type)}
                        </>
                    )}
            >
                {
                    pipelineProofList && pipelineProofList.map(item=>{
                        return(
                            <Option key={item.proofId} value={item.proofName+ "(" + item.proofType + ")"}>
                                { item.proofName+ "(" + item.proofType + ")"}
                            </Option>
                        )
                    })
                }
            </Select>
        </Form.Item>
    )
}

export default observer(ProofAll)