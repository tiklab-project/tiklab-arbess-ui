import React from "react";
import {Login} from "tiklab-eam-ui";

const LoginContent = props => {
    return  <Login
                {...props}
                loginGoRouter="/"
                // vaildUserAuthRouter={"/no-auth"}
            />
}

export default LoginContent
