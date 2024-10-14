import React from "react";
import {ExcludeProductUser} from "tiklab-eam-ui";

/**
 * 没有应用访问权限
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ExcludeProductUserContent = props => {
    return <ExcludeProductUser {...props}/>
}

export default ExcludeProductUserContent
