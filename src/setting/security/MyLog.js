import React from "react";
import {MyLog} from "thoughtware-security-ui";

/**
 * 我的日志
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MyLogContent = props => {

    return <MyLog {...props} bgroup={"matflow"}/>

}

export default MyLogContent
