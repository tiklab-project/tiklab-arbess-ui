/**
 * @Description: 登录
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from "react";
import {Login} from "tiklab-eam-ui";

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
