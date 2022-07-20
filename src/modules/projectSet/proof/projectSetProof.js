import React,{useEffect} from "react";
import {inject,observer} from "mobx-react";
import {getUser} from "doublekit-core-ui";
import Proof from "../../proof/container/proof";

// 项目凭证
const ProjectSetProof = props =>{

    const {proofStore,pipelineStore} = props
    const {findPipelineProof,proofList,fresh} = proofStore
    const {pipelineList} = pipelineStore
    const pipelineId = localStorage.getItem("pipelineId")
    const userId = getUser().userId

    useEffect(()=>{
        const params ={
            pipelineId:pipelineId,
            type:0,
            userId:userId,
        }
        findPipelineProof(params)
    },[fresh,pipelineId])

    return  <Proof
                proofList={proofList}
                type={"project"}
                pipelineList={pipelineList}
            />
}

export default inject("proofStore","pipelineStore")(observer(ProjectSetProof))