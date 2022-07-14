import React from "react";
import {ProjectRoleList} from "doublekit-privilege-ui";
import {PRIVILEGE_PROJECT_ROLE_STORE} from "doublekit-privilege-ui/es/store"
import {inject,observer} from "mobx-react";

// 项目角色管理
const ProjectRole = props =>{
    return <ProjectRoleList {...props}/>
}

export default inject(PRIVILEGE_PROJECT_ROLE_STORE)(observer(ProjectRole))