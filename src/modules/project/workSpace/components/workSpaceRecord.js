import React from "react";
import {Button} from "antd";

// 近期提交记录
const WorkSpaceRecord = props =>{

    const {recordList,setDetailsDrawer,setDrawerContent} = props

    const details = item => {
        setDrawerContent(item)
        setDetailsDrawer(true)
    }
    
    const renderRecordList = recordList => {
        return recordList && recordList.map((group,groupIndex)=>{
            return(
                <div key={groupIndex} className="workSpace-bottom-record">
                    <div className="record_item_dayTime">{group[0].dayTime}</div>
                    {
                        group && group.map((item,index)=>{
                            return(
                                <div key={item.commitId} className="record_item_commit">
                                    <div className="record_item_commit_commitMassage">
                                        {index+1}、{item.commitMassage} --
                                    </div>
                                    <div className="record_item_commit_commitName">
                                        {item.commitName} /
                                    </div>
                                    <div className="record_item_commit_btn">
                                        <Button type= "link" onClick={()=>details(item)}>
                                            详情
                                        </Button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        })
    }

    return(
        <div className="workSpace-bottom">
            <h1>近期提交记录</h1>
            {renderRecordList(recordList)}
            <div className="workSpace-null"/>
        </div>
    )
}

export default WorkSpaceRecord

