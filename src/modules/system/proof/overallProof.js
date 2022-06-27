import React, {Fragment, useEffect} from "react";
import {inject,observer} from "mobx-react";
import {getUser} from "doublekit-core-ui";
import Proof from "../../proof/container/proof";
import SystemBreadcrumb from "../breadcrumb/systemBreadcrumb";

// 系统凭证
const OverallProof = props =>{

    const {proofStore} = props
    const {findAll,systemProofList,fresh} = proofStore

    useEffect(()=>{
        findAll(getUser().userId)
    },[fresh])

    return(
        <Fragment>
            <SystemBreadcrumb firstItem={'凭证管理'}/>
            <Proof proofList={systemProofList} />
        </Fragment>
    )
}

export default inject('proofStore')(observer(OverallProof))