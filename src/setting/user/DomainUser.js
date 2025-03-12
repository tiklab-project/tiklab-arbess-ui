/**
 * @Description: 项目成员
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from "react";
import {DomainUser} from "tiklab-user-ui";

const DomainUserContent = props =>{

    return (
        <DomainUser
            {...props}
            domainId={props.match.params.id}
            bgroup={"arbess"}
        />
    )

}

export default DomainUserContent
