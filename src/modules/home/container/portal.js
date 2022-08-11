import React,{useEffect} from "react";
import {verifyUserHoc,useWorkAppConfig} from "tiklab-eam-ui";
import {connect} from "tiklab-plugin-ui/es/_utils";
import {renderRoutes} from "react-router-config";
import {privilegeStores} from "tiklab-privilege-ui/es/store";
import {getUser} from "tiklab-core-ui";
import "../components/header.scss";
import Heads from "../components/header";

const Portal= props=>{

    const {route}=props

    const [component,ModalComponent,editOrAddModal] = useWorkAppConfig(false, "")

    useEffect(()=>{
        privilegeStores.systemRoleStore.getSystemPermissions(getUser().userId)
    },[])

    return(
        <div className="frame">
            <Heads
                {...props}
                AppConfigComponent={component}
            />
            <div className="frame-content">
                {renderRoutes(route.routes)}
            </div>
            {ModalComponent}
            {editOrAddModal}
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