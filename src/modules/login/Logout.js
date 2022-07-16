import React from "react";
import {Logout} from "doublekit-eam-ui";
import {EAM_STORE} from "doublekit-eam-ui/es/store";
import {inject,observer} from "mobx-react";

const LogoutContent = props =>{
    return <Logout {...props}/>
}

export default inject(EAM_STORE)(observer(LogoutContent))
