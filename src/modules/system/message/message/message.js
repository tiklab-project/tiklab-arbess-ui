import React,{useEffect} from "react";
import {inject,observer} from "mobx-react";
import {Descriptions} from "antd";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";

/*
    系统信息
 */
const Message = props =>{

    const {messageStore} = props
    const {getSystemMessage,infoList} = messageStore

    useEffect(()=>{
        getSystemMessage()
    },[])

    return(
        <div className="systemMore-info">
            <BreadcrumbContent firstItem={"系统信息"} />
            <div  className="systemMore-info-content">
                <Descriptions column={1} bordered>
                    <Descriptions.Item  label="系统版本">{infoList && infoList.osName}</Descriptions.Item>
                    <Descriptions.Item  label="用户名">{infoList && infoList.userName}</Descriptions.Item>
                    <Descriptions.Item  label="Java版本">{infoList && infoList.javaVersion}</Descriptions.Item>
                    <Descriptions.Item  label="Java位置">{infoList && infoList.javaHome}</Descriptions.Item>
                    <Descriptions.Item  label="IP地址">{infoList && infoList.ip}</Descriptions.Item>
                    <Descriptions.Item  label="应用地址">{infoList && infoList.userDir}</Descriptions.Item>
                </Descriptions>
            </div>
        </div>
    )
}

export default inject("messageStore")(observer(Message))