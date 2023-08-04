import React from "react";
import {UserVerify} from "tiklab-eam-ui";
import {connect} from "tiklab-plugin-core-ui";
import {AppLink} from "tiklab-integration-ui";
import Portal from "./Portal";

/**
 * 首页入口
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Home = props => {
    return  <Portal
                {...props}
                AppLink={<AppLink isSSO={false}/>}
            />
}

function mapStateToProps(state) {
    return {
        pluginStore: state.pluginStore
    }
}

export default connect(mapStateToProps)(UserVerify(Home,"/no-auth"))
