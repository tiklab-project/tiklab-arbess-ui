import React from "react";
import {verifyUserHoc} from "tiklab-eam-ui";
import {connect} from "tiklab-plugin-ui/es/_utils";
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

export default connect(mapStateToProps)(verifyUserHoc(Home))
