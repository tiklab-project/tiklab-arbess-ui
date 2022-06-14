import React, {useEffect} from "react";
import './pipelineSysRole.scss';
import {inject,observer} from "mobx-react";
import {PRIVILEGE_SYSTEM_STORE,ProjectRoleList,FeatureList ,RoleList} from 'doublekit-privilege-ui'

const PipelineSysRole = props =>{

    return(
        <div>
            {/*<FeatureList/>*/}
            <ProjectRoleList/>
        </div>
    )
}

export default inject(PRIVILEGE_SYSTEM_STORE)(observer(PipelineSysRole))