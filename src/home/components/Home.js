import React from "react";
import {UserVerify} from "tiklab-eam-ui";
import {connect} from "tiklab-plugin-core-ui";
import Portal from "./Portal";

/**
 * 首页入口
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Home = props => {
    return <Portal {...props}/>
}

function mapStateToProps(state) {
    return {
        pluginStore: state.pluginStore
    }
}

export default connect(mapStateToProps)(UserVerify(Home))
