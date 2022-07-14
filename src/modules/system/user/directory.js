import React from "react";
import {Directory} from "doublekit-user-ui";
import {inject,observer} from "mobx-react";
import {USER_STORE} from "doublekit-user-ui/lib/store"

// 用户目录管理
const UserDirectory = props =>{
    return  <Directory {...props}/>
}

export default inject(USER_STORE)(observer(UserDirectory))