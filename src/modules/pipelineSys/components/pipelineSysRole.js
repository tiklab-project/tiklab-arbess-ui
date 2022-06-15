import React from "react";
import {inject,observer} from "mobx-react";
import {PRIVILEGE_SYSTEM_STORE,ProjectRoleList} from 'doublekit-privilege-ui'

const PipelineSysRole = props =>{
    return <ProjectRoleList {...props}/>
}

export default inject(PRIVILEGE_SYSTEM_STORE)(observer(PipelineSysRole))