import React from "react";
import {Tooltip} from "antd";
import {observer} from "mobx-react";
import StrEmpty from "./strEmpty";
import StrLeftDropdown from "./strLeftDropdown";
import Page from "../../../common/page/page";

const StrLeft = props =>{

    const {status,pipelineId,structureStore}=props

    const {findHistoryLog,leftPageList,setModeData,setIndex,index,page,pipelineUserList,
        execState,pageCurrent,setPageCurrent,setState,setEnforcer,setMode,
    } = structureStore

    const showHistory = (item,i)=> {
        setIndex(i+1)
        findHistoryLog(item.historyId).then(()=>{
            setModeData(item)
        })
    }

    const title = runStatus =>{
        switch (runStatus) {
            case 1:
                return "执行失败"
            case 10:
                return "执行成功"
            case 20:
                return "执行停止"
            case 0:
                return "正在运行"        
        
        }
    }

    const renderLeftPageList = (item,i) => {
        return(
            <div  key={i} onClick={()=>showHistory(item,i)} className={`history-content-list-ul ${index===i+1 ? "history-content-list_active": ""}`}>
                <div className="list-title">{`# ${item.findNumber}`}</div>
                <div className="list-group">
                    <div className="list-group-item">
                        <div className="list-state">
                            <span>状态 : <Tooltip title={title(item.runStatus)}>
                                            {status(item.runStatus)}
                                        </Tooltip>
                            </span> 
                        </div>
                        <div className="list-one">执行人 : {item.user && item.user.nickname}</div>
                    </div>
                    <div className="list-time"> 执行时间 : {item.createTime}</div>
                </div>
            </div>
        )
    }
    
    const renderExecState = execState =>{
        return execState!=="" &&
        <div onClick={()=>setIndex(0)} className={`history-content-list-ul ${index===0 ? "history-content-list_active": ""}`}>
            <div className="list-title">运行中</div>
            <div className="list-group">
                <div className="list-group-item">
                    <div className="list-state">
                        <span>状态 : <Tooltip title={title(0)}>
                                        {status(0)}
                                    </Tooltip>
                        </span> 
                    </div>
                    <div className="list-one">执行人 : {execState && execState[0].execUser}</div>
                </div>
                <div className="list-time"> 执行时间 : {execState && execState[0].createTime}</div>
            </div>
        </div>
    }

    const changPage = pages =>{
        setPageCurrent(pages)
        execState===""?setIndex(1):setIndex(0)
    }

    return(
        <div className="structure-content-left">
            <StrLeftDropdown
                {...props}
                setState={setState}
                setEnforcer={setEnforcer}
                setMode={setMode}
                changPage={changPage}
                pipelineUserList={pipelineUserList}
                pipelineId={pipelineId}
            />
            <div className="structure-content-left-history">
                <div className="history-content">
                    {
                        execState || leftPageList && leftPageList.length > 0 ?
                            <>
                                <div className="history-content-list">
                                
                                    { renderExecState(execState) }

                                    { leftPageList && leftPageList.map((item,i)=>{
                                        return renderLeftPageList(item,i)
                                    })}
                                    
                                </div>
                                <Page
                                    pageCurrent={pageCurrent}
                                    changPage={changPage}
                                    page={page}
                                />
                            </>
                            :
                            <StrEmpty isData={true}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default observer(StrLeft)