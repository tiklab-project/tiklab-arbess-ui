import React from "react";
import StructureLeftExecute from "./structureLeftExecute";
import StructureLeftDropdown from "./structureLeftDropdown";
import StructureEmpty from "./structureEmpty";
import {inject,observer} from "mobx-react";
import {ConfigProvider,Pagination} from "antd";
import zhCN from "antd/es/locale/zh_CN";
import StructureLeftList from "./structureLeftList";

const StructureLeft = props =>{

    const {status,pipelineId,structureStore,structureListStore}=props

    const {findHistoryLog,leftPageList,setModeData,setIndex,index,page,findPageHistory,pipelineUserList,
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
            pipelineId:pipelineId,
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

    return(
        <div className="structure-content-left">
            <StructureLeftDropdown
                {...props}
                state={state}
                setState={setState}
                enforcer={enforcer}
                setEnforcer={setEnforcer}
                mode={mode}
                setMode={setMode}
                pipelineUserList={pipelineUserList}
                change={change}
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
                                    />
                                    { renderLeftPageList(leftPageList) }
                                </div>
                                <div className="history-content-page">
                                    <ConfigProvider locale={zhCN}>
                                        <Pagination
                                            {...page}
                                            simple
                                            current={pageCurrent}
                                            showQuickJumper={true}
                                            showSizeChanger={false}
                                            onChange={onChangePage}
                                        />
                                    </ConfigProvider>
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