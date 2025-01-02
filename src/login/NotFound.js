import React from 'react';
import {NotFound} from "tiklab-eam-ui";

/**
 * 找不到页面
 * @param props
 * @returns {Element}
 * @constructor
 */
const NotFoundContent = props =>{
    return (
        <NotFound
            {...props}
            homePath={'/'}
        />
    )
}

export default NotFoundContent
