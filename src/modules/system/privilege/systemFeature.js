import React from "react";
import {PRIVILEGE_SYSTEM_STORE,FeatureList} from "doublekit-privilege-ui";
import {inject, observer} from "mobx-react";

// 系统功能管理
const SystemFeature = props =>{
    return <FeatureList {...props}/>
}

export default inject(PRIVILEGE_SYSTEM_STORE)(observer(SystemFeature))