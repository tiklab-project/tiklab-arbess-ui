/**
 * @Description: 密码过短时，修改密码
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from 'react';
import {LoginRpw} from "tiklab-eam-ui";

const LoginRpwContent = props => {

    return (
        <LoginRpw
            {...props}
            loginGoRouter='/'
        />
    )
}

export default LoginRpwContent
