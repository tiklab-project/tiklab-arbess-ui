import React from "react";
import {ProjectRoleList} from "tiklab-privilege-ui";

/**
 * 项目权限
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ProjectRole = props =>{

    return <ProjectRoleList {...props} bgroup={"matflow"} isBase={true}/>

}

export default ProjectRole
