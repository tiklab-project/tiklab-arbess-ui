import React, {Fragment, useEffect} from "react";
import {inject,observer} from "mobx-react";
import {getUser} from "doublekit-core-ui";
import Proof from "../../proof/container/proof";
import SystemBreadcrumb from "../breadcrumb/systemBreadcrumb";

// 系统凭证
const OverallProof = props =>{

    const {proofStore} = props
    const {findPipelineProof,proofList,fresh} = proofStore

    useEffect(()=>{
        const param = {
            userId:getUser().userId,
            pipelineId:null,
            type:0
        }
        findPipelineProof(param)
    },[fresh])

    return(
        <Fragment>
            <SystemBreadcrumb firstItem={"凭证管理"}/>
            <Proof proofList={proofList}/>
        </Fragment>
    )
}

export default inject("proofStore")(observer(OverallProof))