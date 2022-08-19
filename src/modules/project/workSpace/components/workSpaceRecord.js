import React from "react";

// 近期提交记录
const WorkSpaceRecord = props =>{

    const {recordList,setDetailsDrawer,setDrawerContent} = props

    const details = item => {
        setDrawerContent(item)
        setDetailsDrawer(true)
    }
    
    const renderRecordList = recordList => {
        return recordList && recordList.map((group,groupIndex)=>{
            return  <div key={groupIndex} className="workSpace-content-record-item">
                        <div className="record_item_dayTime">{group[0].dayTime}</div>
                        {
                            group && group.map((item,index)=>{
                                return(
                                    <div key={item.commitId} className="record_item_commit">
                                        <span className="record_item_commit_commitMassage">
                                            {index+1}、{item.commitMassage} --
                                        </span>
                                        <span className="record_item_commit_commitName">
                                            {item.commitName} / &nbsp;
                                            <span onClick={()=>details(item)} className="btn">
                                                详情
                                            </span>
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div>
        })
    }

    return(
        <div className="workSpace-content-record">
            <h1>近期提交记录</h1>
            { renderRecordList(recordList) }
            <div className="workSpace-content-null"/>
        </div>
    )
}

export default WorkSpaceRecord

