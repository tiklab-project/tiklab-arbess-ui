/**
 * @Description: 项目权限
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from "react";
import {DomainRole} from "tiklab-privilege-ui";

const DomainRoleContent = props =>{

    return (
        <DomainRole
            {...props}
            domainId={props.match.params.id}
            bgroup={"arbess"}
        />
    )

}

export default DomainRoleContent
