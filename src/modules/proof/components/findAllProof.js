import React from "react";
import {inject,observer} from "mobx-react";
import {Form,Select} from "antd";

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