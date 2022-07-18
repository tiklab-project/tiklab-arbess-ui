import React,{useEffect} from "react";
import {inject,observer} from "mobx-react";
import Proof from "../../proof/container/proof";

// 项目凭证
const ProjectSetProof = props =>{

    const {proofStore} = props
    const {findPipelineProof,proofList,fresh} = proofStore
    const pipelineId = localStorage.getItem("pipelineId")

    useEffect(()=>{
        const params ={
            pipelineId:pipelineId,
            type:0,
        }
        findPipelineProof(params)
    },[fresh,pipelineId])

    return <Proof proofList={proofList} type={"project"}/>
}

export default inject("proofStore")(observer(ProjectSetProof))