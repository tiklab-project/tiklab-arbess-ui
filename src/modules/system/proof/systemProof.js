import React,{useEffect} from "react";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import Proof from "../../proof/container/proof";

// 系统凭证
const SystemProof = props =>{

    const {proofStore,matFlowStore} = props
    const {findMatFlowProof,fresh} = proofStore
    const {findAllMatFlowStatus,matFlowList} = matFlowStore
    const userId = getUser().userId

    useEffect(()=>{
        const param = {
            matFlowId:"",
            type:0,
            userId:userId
        }
        findMatFlowProof(param)
    },[fresh])

    useEffect(()=>{
        findAllMatFlowStatus(userId)
    },[])

    return  <Proof matFlowList={matFlowList}/>
}

export default inject("proofStore","matFlowStore")(observer(SystemProof))