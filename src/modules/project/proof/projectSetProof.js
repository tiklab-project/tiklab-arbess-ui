import React,{useEffect} from "react";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import Proof from "../../proof/container/proof";

const ProjectSetProof = props =>{

    const {proofStore,pipelineStore} = props
    const {findPipelineProof,fresh} = proofStore
    const {pipelineId,pipelineName} = pipelineStore
    const userId = getUser().userId

    useEffect(()=>{
        const params ={
            pipelineId:pipelineId,
            type:0,
            userId:userId,
        }
        findPipelineProof(params)
    },[fresh,pipelineId])

    return  <Proof pipelineId={pipelineId} pipelineName={pipelineName}/>

}

export default inject("proofStore","pipelineStore")(observer(ProjectSetProof))