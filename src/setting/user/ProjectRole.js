import React from "react";
import {ProjectRole} from "tiklab-user-ui";

/**
 * 项目权限
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ProjectRoleContent = props =>{

    return <ProjectRole {...props} bgroup={"matflow"} isBase={true}/>

}

export default ProjectRoleContent