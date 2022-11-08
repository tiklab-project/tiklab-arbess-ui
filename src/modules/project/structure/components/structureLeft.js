import React from "react";
import StructureLeftExecute from "./structureLeftExecute";
import StructureLeftDropdown from "./structureLeftDropdown";
import StructureEmpty from "./structureEmpty";
import {inject,observer} from "mobx-react";
import {LeftOutlined,RightOutlined} from "@ant-design/icons";
import StructureLeftList from "./structureLeftList";

const StructureLeft = props =>{

    const {status,pipelineId,structureStore,structureListStore}=props

    const {findHistoryLog,leftPageList,setModeData,setIndex,index,page,pipelineUserList,
        execState} = structureStore
    const {pageCurrent,setPageCurrent,setState,setEnforcer,setMode,drop} = structureListStore

    const sta = item =>{
        if(leftPageList){
            switch (item.runStatus) {
                case 1:
                    return status(2) // 失败
                case 30:
                    return status(1) // 成功
                default:
                    return status(4) // 被迫停止
            }
        }
    }
    
    const showHistory = (item,i)=> {
        setIndex(i+1)
        findHistoryLog(item.historyId).then(()=>{
            setModeData(item)
        })
    }
    
    const renderLeftPageList = leftPageList => {
        return leftPageList.map((item,i)=>{
            return  <StructureLeftList
                        key={i}
                        onClick={()=>showHistory(item,i)}
                        state={sta(item)}
                        index={index}
                        type={i+1}
                        name={item.user && item.user.name}
                        createTime={item.createTime}
                        title={`# ${item.findNumber}`}
                    />
        })
    }

    const changPage = pages =>{
        setPageCurrent(pages)
        if(execState===""){
            setIndex(1)
        }else {
            setIndex(0)
        }
    }

    return(
        <div className="structure-content-left">
            <StructureLeftDropdown
                {...props}
                setState={setState}
                setEnforcer={setEnforcer}
                setMode={setMode}
                changPage={changPage}
                pipelineUserList={pipelineUserList}
                drop={drop}
                pipelineId={pipelineId}
            />
            <div className="structure-content-left-history">
                <div className="history-content">
                    {
                        execState || leftPageList && leftPageList.length > 0 ?
                            <>
                                <div className="history-content-list">
                                    <StructureLeftExecute
                                        execState={execState}
                                        status={status}
                                        index={index}
                                        setIndex={setIndex}
                                        changPage={changPage}
                                    />
                                    { renderLeftPageList(leftPageList) }
                                </div>
                                <div className="history-content-page">
                                    <span
                                        className={`${pageCurrent===1?"page-ban":"page-allow"}`}
                                        onClick={()=>pageCurrent===1? null :changPage(pageCurrent - 1)}
                                    >
                                            <LeftOutlined/>
                                        </span>
                                    <span className="page-current">{pageCurrent}</span>
                                    <span> / {page && page.total}</span>
                                    <span
                                        className={`${pageCurrent===page.total?"page-ban":"page-allow"}`}
                                        onClick={()=>pageCurrent===page.total?null:changPage(pageCurrent + 1)}
                                    >
                                        <RightOutlined/>
                                    </span>
                                </div>
                            </>
                            :
                            <StructureEmpty isData={true}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default inject("structureStore","structureListStore")(observer(StructureLeft))