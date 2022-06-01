import React, {Fragment, useState} from "react";
import {Button} from "antd";
import WorkSpaceRecordDrawer from "./workSpaceRecordDrawer";

const WorkSpaceRecord = props =>{

    const {recordList} = props
    const [detailsDrawer,setDetailsDrawer] = useState(false)
    const [drawerContent,setDrawerContent] = useState([])

    const details = item => {
        setDrawerContent(item)
        setDetailsDrawer(true)
    }

    return(
        <div className='workSpace-bottom'>
            <h1 className='workSpace-h1'>近期提交记录</h1>
            <ul className='workSpace-bottom-group'>
                {
                    recordList && recordList.map((group,groupIndex)=>{
                        return(
                            <li key={groupIndex}>
                                <div className='group_item_dayTime'>{group[0].dayTime}</div>
                                {
                                    group && group.map((item,index)=>{
                                        return(
                                            <div key={item.commitId} className='group_item_commit'>
                                                <div className='group_item_commit_commitMassage'>
                                                    {index+1}、{item.commitMassage} --
                                                </div>
                                                <div className='group_item_commit_commitName'>
                                                    {item.commitName} /
                                                </div>
                                                <div className='group_item_commit_btn'>
                                                    <Button type= 'link' onClick={()=>details(item)}>
                                                        详情
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </li>
                        )
                    })
                }
            </ul>
            <WorkSpaceRecordDrawer
                detailsDrawer={detailsDrawer}
                setDetailsDrawer={setDetailsDrawer}
                drawerContent={drawerContent}
            />
        </div>
    )
}

export default WorkSpaceRecord