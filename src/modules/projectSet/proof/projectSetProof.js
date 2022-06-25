import React, {Fragment, useEffect} from "react";
import {inject,observer} from "mobx-react";
import ProjectBreadcrumb from "../../project/breadcrumb/projectBreadcrumb";
import Proof from "../../proof/container/proof";
import {getUser} from "doublekit-core-ui";

// 项目凭证
const ProjectSetProof = props =>{

    const {proofStore} = props
    const {findPipelineProof,pipelineProofList,fresh} = proofStore
    const pipelineId = localStorage.getItem('pipelineId')

    useEffect(()=>{
        const params ={
            pipelineId:pipelineId,
            type:0,
            userId:getUser().userId
        }
        findPipelineProof(params)
    },[fresh,pipelineId])

    return(
       <Fragment>
           <ProjectBreadcrumb />
           <Proof proofList={pipelineProofList}/>
       </Fragment>
    )
}

export default inject('proofStore')(observer(ProjectSetProof))