import React from "react";
import {UserVerify} from "thoughtware-eam-ui";
import {AppLink,HelpLink,AvatarLink} from "thoughtware-licence-ui";
import Portal from "./Portal";

/**
 * 入口
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Home = props => {
    return  <Portal
                {...props}
                AppLink={<AppLink/>}
                HelpLink={<HelpLink/>}
                AvatarLink={<AvatarLink {...props}/>}
            />
}

export default UserVerify(Home,"/no-auth")
