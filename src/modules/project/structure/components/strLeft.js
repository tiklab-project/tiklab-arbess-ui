import React from "react";
import {Profile} from "tiklab-eam-ui";
import {getUser} from "tiklab-core-ui";
import {Tooltip,Space} from "antd";
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
            <div  key={i} onClick={()=>showHistory(item,i)} className={`history-list-ul ${index===i+1 ? "history-list-active": ""}`}>
                <div className="list-title">{`# ${item.findNumber}`}</div>
                <div className="list-group">
                    <div className="list-group-item">
                        <div className="list-state">
                            状态 :  <Tooltip title={title(item.runStatus)}>
                                        {status(item.runStatus)}
                                    </Tooltip>
                        </div>
                        <div className="list-one">
                            <Space>
                                执行人 :
                                <Profile userInfo={item.user}/> 
                                {item.user && item.user.nickname}
                            </Space>
                        </div>
                    </div>
                    <div className="list-time"> 执行时间 : {item.createTime}</div>
                </div>
            </div>
        )
    }
    
    const renderExecState = execState =>{
        return execState!=="" &&
        <div onClick={()=>setIndex(0)} className={`history-list-ul ${index===0 ? "history-list-active": ""}`}>
            <div className="list-title">运行中</div>
            <div className="list-group">
                <div className="list-group-item">
                    <div className="list-state">
                        状态 :   <Tooltip title={title(0)}>
                                    {status(0)}
                                </Tooltip>
                    </div>
                    <div className="list-one">
                        <Space>
                            执行人 :
                            <Profile userInfo={getUser()}/> 
                            {execState && execState[0].execUser}
                        </Space>
                    </div>
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
        <div className="structure-left">
            <StrLeftDropdown
                {...props}
                setState={setState}
                setEnforcer={setEnforcer}
                setMode={setMode}
                changPage={changPage}
                pipelineUserList={pipelineUserList}
                pipelineId={pipelineId}
            />
            <div className="structure-left-history">
                {
                    execState || leftPageList && leftPageList.length > 0 ?
                        <>
                            <div className="history-list">
                            
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
    )
}

export default observer(StrLeft)