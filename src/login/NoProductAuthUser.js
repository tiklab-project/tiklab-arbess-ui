import React from "react";
import {NoProductAuthUser} from "tiklab-eam-ui";

/**
 * 用户没有在授权页面的引导页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const NoProductAuthUserContent = props => {
    return <NoProductAuthUser {...props}/>
}

export default NoProductAuthUserContent
