/**
 * @Description: 系统权限
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from "react";
import {SystemRole} from "tiklab-privilege-ui";

const SystemRoleContent = props =>{

    return (
        <SystemRole
            {...props}
            bgroup={"arbess"}
        />
    )

}

export default SystemRoleContent
