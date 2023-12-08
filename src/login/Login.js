import React from "react";
import {Login} from "thoughtware-eam-ui";

/**
 * 登录
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const LoginContent = props => {
    return  <Login
                {...props}
                loginGoRouter="/"
                vaildUserAuthRouter={"/no-auth"}
            />
}

export default LoginContent
