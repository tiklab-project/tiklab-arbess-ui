import React from "react";
import {Login} from "doublekit-eam-ui";
import {EAM_STORE} from "doublekit-eam-ui/es/store";
import {inject,observer} from "mobx-react";

const LoginContent = props => {
    return  <Login {...props} loginGoRouter="/"/>
}

export default LoginContent
