import React, {Fragment, useEffect,useState} from "react";
import {inject,observer} from "mobx-react";
import PipelineDetailsBreadcrumb from "../../pipelineBreadcrumb/pipelineBreadcrumb";
import Proof from "../../../proof/container/proof";

const PipelineSysProof = props =>{

    const {proofStore} = props
    const {findPipelineProof,pipelineProofList} = proofStore

    const pipelineId = localStorage.getItem('pipelineId')
    const [fresh,setFresh] = useState(false)

    useEffect(()=>{
        findPipelineProof(pipelineId)
    },[fresh,pipelineId])

    return(
       <Fragment>
           <PipelineDetailsBreadcrumb />
           <Proof proofList={pipelineProofList} fresh={fresh} setFresh={setFresh}/>
       </Fragment>
    )
}

export default inject('proofStore')(observer(PipelineSysProof))