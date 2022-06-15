import React from "react";
import {PRIVILEGE_SYSTEM_STORE,RoleList} from 'doublekit-privilege-ui'
import {inject, observer} from "mobx-react";

const SecurePowerRole = props =>{
    return <RoleList {...props}/>
}

export default inject(PRIVILEGE_SYSTEM_STORE)(observer(SecurePowerRole))
