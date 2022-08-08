import React,{useEffect} from "react";
import {privilegeStores} from "tiklab-privilege-ui/es/store";
import {verifyUserHoc,useWorkAppConfig} from "tiklab-eam-ui";
import {connect} from "tiklab-plugin-ui/es/_utils";
import {getUser} from "tiklab-core-ui";
import "../components/header.scss";
import Heads from "../components/header";
import {renderRoutes} from "react-router-config";
import apiboxImg from "tiklab-eam-ui/es/assests/img/apibox.png";
import jenkinsImg from "tiklab-eam-ui/es/assests/img/jenkins.png";
import knowledgeImg from "tiklab-eam-ui/es/assests/img/apibox.png";
import projectImg from "tiklab-eam-ui/es/assests/img/project.png";

const Portal= props=>{

    const {route}=props

    const productIcons = {
        postin:apiboxImg,
        teamwire:projectImg,
        teston:jenkinsImg,
        kanass:knowledgeImg
    }

    const headerRoutes=[
        {
            key:"homePage",
            to:"/index/home",
            title: "首页",
        },
        {
            key:"matFlow",
            to:"/index/matFlow",
            title: "流水线",
        },
        {
            key:"system",
            to:"/index/system",
            title:"系统设置",
        }
    ]

    const [component,ModalComponent,editOrAddModal] = useWorkAppConfig(false, productIcons)

    useEffect(()=>{
        // 导航控制
        privilegeStores.systemRoleStore.getSystemPermissions(getUser().userId)
    },[])

    return(
        <div className="frame">
            <Heads
                {...props}
                AppConfigComponent={component}
                routers={headerRoutes}
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
export default connect(mapStateToProps)(IndexHoc);