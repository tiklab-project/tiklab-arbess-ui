import React from "react";
import {UserList} from "doublekit-user-ui";
import {USER_STORE} from "doublekit-user-ui/es/store";
import {SYSTEM_ROLE_STORE} from "doublekit-privilege-ui/es/store"
import {inject,observer} from "mobx-react";

// 用户列表
const List = props =>{
    return <UserList {...props} />
}

export default inject(USER_STORE,SYSTEM_ROLE_STORE)(observer(List))