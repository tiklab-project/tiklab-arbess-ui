import React from "react";
import {ProjectFeatureList} from "doublekit-privilege-ui";
import {PRIVILEGE_PROJECT_FEATURE_STORE} from "doublekit-privilege-ui/es/store"
import {inject,observer} from "mobx-react";

// 项目功能管理
const ProjectFeature = props =>{
    return <ProjectFeatureList {...props}/>
}

export default inject(PRIVILEGE_PROJECT_FEATURE_STORE)(observer(ProjectFeature))