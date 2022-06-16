import React from "react";
import {PRIVILEGE_SYSTEM_STORE,FeatureList,PrivilegeProjectButton} from "doublekit-privilege-ui";
import {inject, observer} from "mobx-react";

const SecurePowerDomain = props =>{
    return <FeatureList {...props}/>
}

export default inject(PRIVILEGE_SYSTEM_STORE)(observer(SecurePowerDomain))