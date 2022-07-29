import React from "react";
import {inject,observer} from "mobx-react";
import {Form,Select} from "antd";
import {getUser} from "doublekit-core-ui";

const {Option} = Select

const FindAllProof = props =>{

    const {proofStore,type,pipelineStore,configDataStore}=props

    const {findPipelineProof,proofList} = proofStore
    const {pipelineId} = pipelineStore
    const {setGitProofId,setDeployProofId} = configDataStore

    const userId = getUser().userId

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

    const changeGitSelect = (value,e) =>{
        if(type < 6){
            setGitProofId(e.key)
        }else {
            setDeployProofId(e.key)
        }
    }

    return(
        <Form.Item
            label="凭证"
            name={type < 6 ? "gitProofName" : "dockerProofName"}
            rules={type === 2 || type === 3 ? [{required:true, message:"请选择凭证"}] : null}
            className={type === 2 || type ===3 ? null : "noRequired"}
        >
            <Select style={{ width: 300 }}
                    onClick={clickFindAllGit}
                    onChange={(value,e)=>changeGitSelect(value,e)}
                    placeholder="请选择凭证"
            >
                {
                    proofList && proofList.map(item=>{
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

export default inject("proofStore","pipelineStore","configDataStore")(observer(FindAllProof))