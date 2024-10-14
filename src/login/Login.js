import React from "react";
import {Login} from "tiklab-eam-ui";

/**
 * 登录
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const LoginContent = props => {
    return (
        <Login
            {...props}
            bgroup={'arbess'}
            loginGoRouter="/"
            vaildUserAuthRouter={"/noAuth"}
        />
    )
}

export default LoginContent
