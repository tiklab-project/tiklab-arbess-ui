import React from "react";
import {UserVerify} from "tiklab-eam-ui";
import {connect} from "tiklab-plugin-core-ui";
import {AppLink,HelpLink,AvatarLink} from "tiklab-licence-ui";
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

function mapStateToProps(state) {
    return {
        pluginStore: state.pluginStore
    }
}

export default connect(mapStateToProps)(UserVerify(Home,"/no-auth"))
