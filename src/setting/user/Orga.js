import React from "react";
import {OrgaList} from "tiklab-user-ui";

/**
 * 部门
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Orga = props=>{

    return <OrgaList {...props} bgroup={"matflow"}/>

}

export default Orga
