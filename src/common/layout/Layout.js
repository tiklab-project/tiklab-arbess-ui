import React from 'react';
import {AppLink,HelpLink,AvatarLink} from "thoughtware-licence-ui";
import {UserVerify} from 'thoughtware-eam-ui';
import SettingAside from "./SettingAside";
import Portal from "./Portal";

const Layout = props =>{

    return (
        <Portal
            {...props}
            AppLink={<AppLink/>}
            HelpLink={<HelpLink/>}
            AvatarLink={<AvatarLink {...props}/>}
        >
            <SettingAside {...props} />
        </Portal>
    )
}


export default UserVerify(Layout,'/no-auth')

