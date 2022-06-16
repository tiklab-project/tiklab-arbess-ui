import React from "react";
import {PRIVILEGE_SYSTEM_STORE, ProjectFeatureList} from "doublekit-privilege-ui";
import {inject, observer} from "mobx-react";

const PipelineSysDomain = props =>{
    return <ProjectFeatureList {...props}/>
}

export default inject(PRIVILEGE_SYSTEM_STORE)(observer(PipelineSysDomain))