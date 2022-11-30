import React from "react";
import {verifyUserHoc} from "tiklab-eam-ui";
import {connect} from "tiklab-plugin-ui/es/_utils";
import {renderRoutes} from "react-router-config";
import "../components/header.scss";
import Heads from "../components/header";

const Portal= props=>{

    const {route}=props

    return(
        <div className="frame">
            <Heads/>
            <div className="frame-content">
                {renderRoutes(route.routes)}
            </div>
        </div>
    )
}

const IndexHoc = verifyUserHoc(Portal)
function mapStateToProps(state) {
    return {
        pluginStore: state.pluginStore
    }
}

export default connect(mapStateToProps)(IndexHoc)