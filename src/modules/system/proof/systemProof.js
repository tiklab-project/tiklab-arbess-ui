import React,{useEffect} from "react";
import {inject,observer} from "mobx-react";
import {getUser} from "doublekit-core-ui";
import Proof from "../../proof/container/proof";

// 系统凭证
const SystemProof = props =>{

    const {proofStore,pipelineStore} = props
    const {findPipelineProof,proofList,fresh} = proofStore
    const {findAllPipelineStatus,pipelineList} = pipelineStore
    const userId = getUser().userId

    useEffect(()=>{
        const param = {
            pipelineId:"",
            type:0
        }
        findPipelineProof(param)
    },[fresh])

    useEffect(()=>{
        findAllPipelineStatus(userId)
    },[])

    return  <Proof
                proofList={proofList}
                firstItem={"凭证管理"}
                type={"system"}
                pipelineList={pipelineList}
            />
}

export default inject("proofStore","pipelineStore")(observer(SystemProof))