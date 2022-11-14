import React from "react";
import StructureLeftExecute from "./structureLeftExecute";
import StructureLeftDropdown from "./structureLeftDropdown";
import StructureEmpty from "./structureEmpty";
import {inject,observer} from "mobx-react";
import StructureLeftList from "./structureLeftList";
import Page from "../../../common/page/page";

const StructureLeft = props =>{

    const {status,pipelineId,structureStore,structureListStore}=props

    const {findHistoryLog,leftPageList,setModeData,setIndex,index,page,pipelineUserList,
        execState} = structureStore
    const {pageCurrent,setPageCurrent,setState,setEnforcer,setMode,drop} = structureListStore
    
    const showHistory = (item,i)=> {
        setIndex(i+1)
        console.log(item)
        findHistoryLog(item.historyId).then(()=>{
            setModeData(item)
        })
    }
    
    const renderLeftPageList = leftPageList => {
        return leftPageList.map((item,i)=>{
            return  <StructureLeftList
                        key={i}
                        onClick={()=>showHistory(item,i)}
                        state={status(item.runStatus)}
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
                                <Page
                                    pageCurrent={pageCurrent}
                                    changPage={changPage}
                                    page={page}
                                />
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