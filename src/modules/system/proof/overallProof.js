import React, {Fragment, useEffect} from "react";
import {inject,observer} from "mobx-react";
import {getUser} from "doublekit-core-ui";
import Proof from "../../proof/container/proof";
import SystemBreadcrumb from "../breadcrumb/systemBreadcrumb";

// 系统凭证
const OverallProof = props =>{

    const {proofStore} = props
    const {findPipelineProof,pipelineProofList,fresh} = proofStore

    useEffect(()=>{
        findPipelineProof(getUser().userId)
    },[fresh])

    return(
        <Fragment>
            <SystemBreadcrumb firstItem={"凭证管理"}/>
            <Proof proofList={pipelineProofList} />
        </Fragment>
    )
}

export default inject("proofStore")(observer(OverallProof))