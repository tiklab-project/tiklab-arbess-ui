/**
 * @Description: 项目集权限
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from "react";
import {ProjectRole} from "tiklab-privilege-ui";

const ProjectRoleContent = props =>{

    return (
        <ProjectRole
            {...props}
            bgroup={"arbess"}
            isBase={true}
        />
    )

}

export default ProjectRoleContent
