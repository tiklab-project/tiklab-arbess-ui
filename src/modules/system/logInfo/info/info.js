import React,{useEffect} from "react";
import SystemBreadcrumb from "../../breadcrumb/systemBreadcrumb";
import {inject,observer} from "mobx-react";
import {Descriptions} from "antd";

const Info = props =>{

    const {logInfoStore} = props
    const {getSystemMessage,infoList} = logInfoStore

    useEffect(()=>{
        getSystemMessage()
    },[])

    return(
        <div className="systemMore-info">
            <SystemBreadcrumb firstItem={"系统信息"}/>
            <div  className="systemMore-info-content">
                <Descriptions column={1} bordered>
                    <Descriptions.Item  label="用户名">{infoList && infoList.userName}</Descriptions.Item>
                    <Descriptions.Item  label="Java版本">{infoList && infoList.javaVersion}</Descriptions.Item>
                    <Descriptions.Item  label="应用地址">{infoList && infoList.userDir}</Descriptions.Item>
                    <Descriptions.Item  label="系统版本">{infoList && infoList.osName}</Descriptions.Item>
                </Descriptions>
            </div>
        </div>
    )
}

export default inject('logInfoStore')(observer(Info))