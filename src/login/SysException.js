import React from "react";
import {SysException} from "tiklab-eam-ui";

/**
 * 系统异常
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const SysExceptionContent = props => {
    return (
        <SysException
            {...props}
        />
    )
}

export default SysExceptionContent
