/**
 * @Description: 页面没有权限访问
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from 'react';
import {NoAccess} from "tiklab-privilege-ui";

const NoAccessContent = props =>{
    return (
        <NoAccess
            {...props}
            homePath={'/'}
        />
    )
}

export default NoAccessContent
