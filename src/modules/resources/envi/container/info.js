import React,{useEffect} from "react";
import {inject,observer} from "mobx-react";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import "../components/info.scss";

/*
    系统信息
 */
const Info = props =>{

    const {enviStore} = props
    const {getSystemMessage,infoList} = enviStore

    useEffect(()=>{
        getSystemMessage()
    },[])

    const infoData = [
        {
            title:"工作空间",
            data:infoList && infoList.workspace
        },
        {
            title:"系统版本",
            data:infoList && infoList.osName
        },
        {
            title:"用户名",
            data:infoList && infoList.userName
        },
        {
            title:"Java版本",
            data:infoList && infoList.javaVersion
        },
        {
            title:"Java位置",
            data:infoList && infoList.javaHome
        },
        {
            title:"IP地址",
            data:infoList && infoList.ip
        },
        {
            title:"应用地址",
            data:infoList && infoList.userDir
        },
    ]

    return(
        <div className="info home-limited mf">
            <BreadcrumbContent firstItem={"系统信息"} />
            <div  className="info-content">
                {
                    infoData && infoData.map(item=>{
                        return  <div className="info-list" key={item.title}>
                                    <div>{item.title}</div>
                                    <div>{item.data}</div>
                                </div>
                    })
                }

            </div>
            {/*<div className="progress-1"></div>*/}
            {/*<div  className="container">*/}
            {/*    <div className="shape"/>*/}
            {/*    <div className="shape"/>*/}
            {/*    <div className="shape"/>*/}
            {/*</div>*/}
        </div>
    )
}

export default inject("enviStore")(observer(Info))