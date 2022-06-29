import React,{useEffect} from "react";
import SystemBreadcrumb from "../../breadcrumb/systemBreadcrumb";
import {inject, observer} from "mobx-react";

const Log = props =>{

    const {logInfoStore} = props
    const {getSystemLog,logList} = logInfoStore

    useEffect(()=>{
        getSystemLog()
    },[])

    const renderLog = logList => {
        if(logList.length === 0){
           return null
        }
        const log =[]
        for (let i = logList.length; i >= 0 ; i--){
            log.push(logList[i-1] +"\n")
        }
        return log
    }

    return(
        <div className="systemMore-log">
            <div className="systemMore-log-head">
                <SystemBreadcrumb firstItem={"系统日志"}/>
            </div>
            <div style={{"whiteSpace":"pre-wrap"}}>
                { renderLog(logList) }
            </div>
        </div>
    )
}

export default inject('logInfoStore')(observer(Log))