import React from "react";
import {SystemRoleList} from "doublekit-privilege-ui";
import {SYSTEM_ROLE_STORE} from "doublekit-privilege-ui/es/store"
import {inject,observer} from "mobx-react";

// 系统角色管理
const SystemRole = props =>{
    return <SystemRoleList {...props}/>
}

export default inject(SYSTEM_ROLE_STORE)(observer(SystemRole))
