/**
 * @Description: 404页面
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from 'react';
import {NotFound} from "tiklab-eam-ui";

const NotFoundContent = props =>{
    return (
        <NotFound
            {...props}
            homePath={'/'}
        />
    )
}

export default NotFoundContent
