import React from "react";
import { Login, EAM_STORE } from "doublekit-eam-ui";

const LoginContent = props => {

    return(
        <Login
            {...props}
            loginGoRouter="/"
            fetchMethod={fetchMethod}
            languageUrl={pluginAddressUrl}
        />
    )

}

export default LoginContent
