import React,{useEffect} from "react";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import Proof from "../../proof/container/proof";

// 项目凭证
const ProjectSetProof = props =>{

    const {proofStore,matFlowStore} = props
    const {findMatFlowProof,fresh} = proofStore
    const {matFlowId} = matFlowStore
    const userId = getUser().userId

    useEffect(()=>{
        const params ={
            matFlowId:matFlowId,
            type:0,
            userId:userId,
        }
        findMatFlowProof(params)
    },[fresh,matFlowId])

    return  <Proof matFlowId={matFlowId}/>

}

export default inject("proofStore","matFlowStore")(observer(ProjectSetProof))