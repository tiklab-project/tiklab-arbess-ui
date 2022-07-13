import React from "react";
import {inject,observer} from "mobx-react";
import {Form,Select} from "antd";
import {getUser} from "doublekit-core-ui";
const {Option} = Select

const FindAllProof = props =>{

    const {proofStore,type}=props
    const {findPipelineProof,proofList} = proofStore
    const pipelineId = localStorage.getItem("pipelineId")

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
            userId:getUser().userId
        }
        findPipelineProof(params)
    }

    const changeGitSelect = (value,e) =>{
        if(type < 6){
            localStorage.setItem("gitProofId",e.key)
        }else {
            localStorage.setItem("deployProofId",e.key)
        }
    }

    return(
        <Form.Item name={type < 6 ? "gitProofName" : "dockerProofName"}  label="凭证">
            <Select style={{ width: 300 }}
                    onClick={clickFindAllGit}
                    onChange={(value,e)=>changeGitSelect(value,e)}
            >
                {
                    proofList && proofList.map(item=>{
                        return(
                            <Option key={item.proofId} value={item.proofName+ "(" + item.proofUsername + ")"}>
                                { item.proofName+ "(" + item.proofUsername + ")"}
                            </Option>
                        )
                    })
                }
            </Select>
        </Form.Item>
    )
}

export default inject("proofStore")(observer(FindAllProof))