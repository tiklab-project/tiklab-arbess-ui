import React from 'react';
import {LoginRpw} from "tiklab-eam-ui";

/**
 * 修改密码
 * 密码过短时，修改密码
 * @param props
 * @returns {Element}
 * @constructor
 */
const LoginRpwContent = props => {

    return (
        <LoginRpw
            {...props}
            loginGoRouter='/'
        />
    )
}

export default LoginRpwContent
