import React from 'react';
import {AppLink,HelpLink,AvatarLink} from "tiklab-licence-ui";
import {UserVerify} from 'tiklab-eam-ui';
import SettingAside from "./SettingAside";
import Portal from "./Portal";

/**
 * 页面入口
 * @param props
 * @returns {Element}
 * @constructor
 */
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

