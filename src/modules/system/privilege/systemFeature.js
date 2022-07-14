import React from "react";
import {SystemFeatureList} from "doublekit-privilege-ui";
import {PRIVILEGE_SYSTEM_STORE} from "doublekit-privilege-ui/es/store"
import {inject,observer} from "mobx-react";

// 系统功能管理
const SystemFeature = props =>{
    return <SystemFeatureList {...props}/>
}

export default inject(PRIVILEGE_SYSTEM_STORE)(observer(SystemFeature))