import React from "react";
import {UserList} from "doublekit-user-ui";
import {SYSTEM_ROLE_STORE} from "doublekit-privilege-ui/es/store";
import {inject,observer} from "mobx-react";

// 用户列表
const List = props =>{
    return <UserList {...props} />
}

export default inject(SYSTEM_ROLE_STORE)(observer(List))