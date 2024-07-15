import React from 'react';
import {AppLink,HelpLink,AvatarLink} from "thoughtware-licence-ui";
import Portal from "./Portal";
import {UserVerify} from 'thoughtware-eam-ui'

const Home = props =>{

    return (
        <Portal
            {...props}
            AppLink={<AppLink/>}
            HelpLink={<HelpLink/>}
            AvatarLink={<AvatarLink {...props}/>}
        />
    )
}


export default UserVerify(Home,'/no-auth')

