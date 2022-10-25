import React from "react";
import {verifyUserHoc} from "tiklab-eam-ui";
import {connect} from "tiklab-plugin-ui/es/_utils";
import {renderRoutes} from "react-router-config";
import "./header.scss";
import Heads from "./header";

const Portal= props=>{

    const {route}=props

    // const [component,ModalComponent,editOrAddModal] = WorkAppConfig(false, "")

    return(
        <div className="frame">
            <Heads/>
            <div className="frame-content">
                {renderRoutes(route.routes)}
            </div>
            {/*{ModalComponent}*/}
            {/*{editOrAddModal}*/}
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