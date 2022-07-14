import React from "react";
import {OrgaList} from "doublekit-user-ui";
import {ORG_STORE} from "doublekit-user-ui/lib/store";
import {inject,observer} from "mobx-react";

// 组织管理
const Org = props=>{
    return <OrgaList {...props}/>
}

export default inject(ORG_STORE)(observer(Org))