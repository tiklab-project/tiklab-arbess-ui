import React from "react";
import {ProjectFeatureList} from "tiklab-privilege-ui";

/**
 * 项目功能管理
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ProjectFeature = props =>{

    return <ProjectFeatureList {...props} bgroup={"matflow"}/>

}

export default ProjectFeature
