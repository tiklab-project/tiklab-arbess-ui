import React from "react";
import {ProjectRoleList} from "tiklab-privilege-ui";

/**
 * 项目权限
 */
const ProjectRole = props =>{

    return <ProjectRoleList {...props} bgroup={"matflow"} isBase={true}/>

}

export default ProjectRole
