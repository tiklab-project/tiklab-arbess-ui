import React,{useEffect} from "react";
import SystemBreadcrumb from "../../breadcrumb/systemBreadcrumb";
import {inject, observer} from "mobx-react";
import "./log.scss";

// 系统日志
const Log = props =>{

    const {systemMassageStore} = props
    const {getSystemLog,logList} = systemMassageStore

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
                <SystemBreadcrumb firstItem={"系统日志"}/>
            </div>
            <div className="log-content">
                { renderLog(logList) }
            </div>
        </div>
    )
}

export default inject("systemMassageStore")(observer(Log))