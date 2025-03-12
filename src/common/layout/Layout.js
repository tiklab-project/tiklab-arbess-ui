/**
 * @Description: 应用入口
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from 'react';
import {AppLink,HelpLink,AvatarLink} from "tiklab-licence-ui";
import {UserVerify} from 'tiklab-eam-ui';
import SettingAside from "./SettingAside";
import Portal from "./Portal";

const Layout = props =>{

    return (
        <Portal
            {...props}
            AppLink={AppLink}
            HelpLink={HelpLink}
            AvatarLink={AvatarLink}
        >
            <SettingAside {...props} />
        </Portal>
    )
}


export default UserVerify(Layout,'/noAuth')

