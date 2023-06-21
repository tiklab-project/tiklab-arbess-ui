import React,{useEffect,useState} from "react";
import enviStore from "../store/EnviStore";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import "./Info.scss";

/**
 * 系统信息页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Info = props =>{

    const {getSystemMessage} = enviStore

    const [infoList,setInfoList] = useState([])

    useEffect(()=>{
        // 系统信息
        getSystemMessage().then(res=>{
            if(res.code===0 && res.data){
                setInfoList(res.data)
            }
        })
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
        <div className="info mf-home-limited mf">
            <BreadcrumbContent firstItem={"系统信息"} />
            <div  className="info-content">
                {
                    infoData && infoData.map(item=>{
                        return  <div className="info-list" key={item.title}>
                                    <div className="info-title">{item.title}</div>
                                    <div>{item.data}</div>
                                </div>
                    })
                }
            </div>
        </div>
    )
}

export default Info
