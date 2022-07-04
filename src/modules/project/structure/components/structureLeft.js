import React,{useState,Fragment} from "react";
import StructureLeftExecute from "./structureLeftExecute";
import StructureLeftDropdown from "./structureLeftDropdown";
import {List} from "antd";

const StructureLeft = props =>{

    const { findHistoryLog,leftPageList,execState,status,setModeData,setIndex,index,page,findPageHistory,
        pipelineId,pipelineUserList }=props

    const [state,setState] = useState(0)  // 状态
    const [enforcer,setEnforcer] = useState(null)   //执行人
    const [mode,setMode] = useState(0)   //执行方式

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
        findHistoryLog(item.historyId).then(()=>{
            setModeData(item)
            setIndex(i+1)
        })
    }

    const onChangePage = pagination => {
        const params = {
            pipelineId:pipelineId,
            pageParam: {
                pageSize: 10,
                currentPage:pagination
            },
            state:state,
            name:enforcer,
            type:mode
        }
        findPageHistory(params)
    }

    return(
        <div className="structure-content-left">
            <StructureLeftDropdown
                findPageHistory={findPageHistory}
                state={state}
                setState={setState}
                enforcer={enforcer}
                setEnforcer={setEnforcer}
                mode={mode}
                setMode={setMode}
                pipelineUserList={pipelineUserList}
            />
            <div className="structure-content-left-history">
                <div className="history-content">
                    {   execState === "" ? null:
                        <StructureLeftExecute
                            execState={execState}
                            status={status}
                            index={index}
                            setIndex={setIndex}
                        />
                    }
                    <List
                        itemLayout="vertical"
                        size="large"
                        locale={{emptyText:
                                <Fragment>
                                    <svg className="icon" aria-hidden="true" >
                                        <use xlinkHref="#icon-meiyouxiangguan"/>
                                    </svg>
                                    <div>没有数据</div>
                                </Fragment>
                        }}
                        pagination={{
                            ...page,
                            onChange: (page) => {onChangePage(page);},
                            hideOnSinglePage:true,
                            showSizeChanger:false,
                        }}
                        dataSource={leftPageList}
                        renderItem={(item,i) => (
                            <List.Item key={i}>
                                <div onClick={()=>showHistory(item,i)}
                                     className={index=== i+1 ?
                                        "history-content-list history-content-list_active"
                                        :  "history-content-list"
                                     }
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
                </div>
            </div>
        </div>
    )
}

export default StructureLeft