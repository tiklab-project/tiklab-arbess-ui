import React from "react";
import StructureLeftExecute from "./structureLeftExecute";
import StructureLeftDropdown from "./structureLeftDropdown";
import StructureEmpty from "./structureEmpty";
import {inject,observer} from "mobx-react";
import {List} from "antd";

const StructureLeft = props =>{

    const {status,matFlowId,structureStore,structureListStore}=props

    const {findHistoryLog,leftPageList,setModeData,setIndex,index,page,findPageHistory,matFlowUserList,
        execState} = structureStore
    const {pageCurrent,setPageCurrent,state,setState,enforcer,setEnforcer,mode,setMode,drop} = structureListStore

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

    const onChangePage = pagination => {
        const params = {
            matflowId:matFlowId,
            pageParam: {
                pageSize: 10,
                currentPage:pagination
            },
            state:state,
            name:enforcer,
            type:mode
        }
        change(params,pagination)
    }

    const change = (params,page) =>{
        setPageCurrent(page)
        findPageHistory(params).then(()=>{
            if(index!==0){
                if(execState){
                    setIndex(0)
                }else{
                    setIndex(1)
                }
            }
        })
    }

    return(
        <div className="structure-content-left">
            <StructureLeftDropdown
                state={state}
                setState={setState}
                enforcer={enforcer}
                setEnforcer={setEnforcer}
                mode={mode}
                setMode={setMode}
                matFlowUserList={matFlowUserList}
                change={change}
                drop={drop}
                matFlowId={matFlowId}
            />
            <div className="structure-content-left-history">
                <div className="history-content">
                    <StructureLeftExecute
                        execState={execState}
                        status={status}
                        index={index}
                        setIndex={setIndex}
                    />
                    {
                        execState === ""  && leftPageList && leftPageList.length === 0 ?
                            <StructureEmpty/>
                            :
                            <List
                                itemLayout="vertical"
                                size="large"
                                pagination={{
                                    ...page,
                                    onChange:(page)=>{onChangePage(page)},
                                    hideOnSinglePage:true,
                                    showSizeChanger:false,
                                    current:pageCurrent,
                                }}
                                dataSource={leftPageList}
                                renderItem={(item,i) => (
                                    <List.Item key={i}>
                                        <div onClick={()=>showHistory(item,i)}
                                             className={`history-content-list
                                             ${index===i+1 ? "history-content-list_active":null }`}
                                        >
                                            <div className="list-title"> # {item.findNumber}</div>
                                            <div className="list-group">
                                                <div className="list-group-item">
                                                    <div className="list-state">
                                                        状态 : {sta(item)}
                                                    </div>
                                                    <div className="list-one">
                                                        执行人 : {item.user && item.user.name}
                                                    </div>
                                                </div>
                                                <div className="list-time">
                                                    执行时间 : {item.createTime}
                                                </div>
                                            </div>
                                        </div>
                                    </List.Item>
                                )}
                            />
                    }
                </div>
            </div>
        </div>
    )
}

export default inject("structureStore","structureListStore")(observer(StructureLeft))