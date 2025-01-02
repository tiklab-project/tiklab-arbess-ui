import React from 'react';
import {NoAccess} from "tiklab-privilege-ui";

/**
 * 页面没有权限访问
 * @param props
 * @returns {Element}
 * @constructor
 */
const NoAccessContent = props =>{
    return (
        <NoAccess
            {...props}
            homePath={'/'}
        />
    )
}

export default NoAccessContent
