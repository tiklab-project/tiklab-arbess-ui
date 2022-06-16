import React, {Fragment, useEffect, useState} from "react";
import {inject,observer} from "mobx-react";
import '../../pipelineSys/container/pipelineSys.scss';
import {getUser} from "doublekit-core-ui";
import Proof from "../../proof/container/proof";
import SystemBreadcrumb from "../../system/systemBreadcrumb";

const SecureProof = props =>{

    const {proofStore} = props
    const {findAll,systemProofList} = proofStore

    const [fresh,setFresh] = useState(false)

    useEffect(()=>{
        findAll(getUser().userId)
    },[fresh])

    return(
        <Fragment>
            <SystemBreadcrumb firstItem={'安全设置'} secondItem={'凭证设置'}/>
            <Proof proofList={systemProofList} fresh={fresh} setFresh={setFresh}/>
        </Fragment>
    )
}

export default inject('proofStore')(observer(SecureProof))