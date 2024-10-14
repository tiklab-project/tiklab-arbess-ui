import React from "react";
import {Directory} from "tiklab-user-ui";

/**
 * 用户目录
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const UserDirectory = props =>{

    return (
        <Directory
            {...props}
            bgroup={"arbess"}
        />
    )

}

export default UserDirectory
