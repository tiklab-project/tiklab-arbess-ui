import React,{useEffect} from "react";
import "./log.scss";
import {inject,observer} from "mobx-react";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";

// 系统日志
const Log = props =>{

    const {messageStore} = props
    const {getSystemLog,logList} = messageStore

    useEffect(()=>{
        getSystemLog()
    },[])

    const renderLog = logList => {
        return logList && logList.reverse().map((item,index)=>{
            return <div key={index} className="log-content-item">{`${item + "\n"}`}</div>
        })
    }

    return(
        <div className="log">
            <div className="log-head">
                <BreadcrumbContent firstItem={"系统日志"}/>
            </div>
            <div className="log-content">
                { renderLog(logList) }
            </div>
        </div>
    )
}

export default inject("messageStore")(observer(Log))