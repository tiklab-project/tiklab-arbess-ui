import React,{useEffect} from "react";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import Proof from "../../proof/container/proof";

// 系统凭证
const SystemProof = props =>{

    const {proofStore,pipelineStore} = props
    const {findPipelineProof,fresh} = proofStore
    const {findAllPipelineStatus,pipelineList} = pipelineStore
    const userId = getUser().userId

    useEffect(()=>{
        const param = {
            pipelineId:"",
            type:0,
            userId:userId
        }
        findPipelineProof(param)
    },[fresh])

    useEffect(()=>{
        // 所有流水线
        findAllPipelineStatus(userId)
    },[])

    return  <Proof pipelineList={pipelineList}/>
}

export default inject("proofStore","pipelineStore")(observer(SystemProof))