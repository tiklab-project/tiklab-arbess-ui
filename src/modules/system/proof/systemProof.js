import React, {useEffect} from "react";
import {inject,observer} from "mobx-react";
import {getUser} from "doublekit-core-ui";
import Proof from "../../proof/container/proof";

// 系统凭证
const SystemProof = props =>{

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

    return <Proof proofList={proofList} firstItem={"凭证管理"} type={"system"}/>
}

export default inject("proofStore")(observer(SystemProof))