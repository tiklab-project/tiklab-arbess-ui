import React from "react";
import {observer} from "mobx-react";
import StrEmpty from "./strEmpty";
import StrLeftList from "./strLeftList";
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

    const renderLeftPageList = (item,i) => {
        return  <StrLeftList
                    key={i}
                    onClick={()=>showHistory(item,i)}
                    state={status(item.runStatus)}
                    index={index}
                    type={i+1}
                    name={item.user && item.user.name}
                    createTime={item.createTime}
                    title={`# ${item.findNumber}`}
                />
    }
    
    const renderExecState = execState =>{
        return execState===""?
            null
            :
            <StrLeftList
                onClick={()=>setIndex(0)}
                index={index}
                name={execState && execState.execName}
                state={status(5)}
                type={0}
                createTime={execState && execState.createTime}
                title={`运行中`}
            />
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