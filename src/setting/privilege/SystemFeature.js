import React from "react";
import {SystemFeatureList} from "tiklab-privilege-ui";

/**
 * 系统功能管理
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const SystemFeature = props =>{

    return <SystemFeatureList {...props} bgroup={"matflow"}/>

}

export default SystemFeature
