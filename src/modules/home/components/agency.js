import React from "react";
import {ShareAltOutlined,UserOutlined,ArrowRightOutlined} from "@ant-design/icons";
import Guide from "./guide";
import EmptyText from "../../../common/emptyText/emptyText";

const Agency = props =>{

    const {taskList} = props
    
    const state = state => {
        switch (state){
            case 1:return "进行中"
            case 2:return "已完成"
            case 3:return "逾期"
        }
    }

    const renderUser = item =>{
        return(
            <div className="agency-item-user">
                <span>
                    <UserOutlined/>
                </span>
                <span className="user-create createUser">
                    {item.createUser.name}
                </span>
                <span className="user-arrow">
                    <ArrowRightOutlined />
                </span>
                <span>
                    <UserOutlined/>
                </span>
                <span className="user-create execUser">
                    {item.assignUser.name}
                </span>
            </div>
        )
    }

    const renderState = item =>{
        return  <div className={`agency-item-state state-${item.status}`}>
                    {state(item.status)}
                </div>
    }

    const renderTaskList = (item,index) =>{
        return <div key={index} className="agency-bottom-list">
            <div className="agency-item">
                <div className="agency-item-title">
                    <span className="title-icon">
                        <ShareAltOutlined/>
                    </span>
                    <span className="title-name">
                        {item.title}
                    </span>
                </div>
                {renderUser(item)}
                {renderState(item)}
                <div className="agency-item-time">
                    {item.endTime}
                </div>
            </div>
        </div>
    }

    return(
        <div className="agency">
            <Guide
                title={"我的待办"}
                type={"agency"}
            />
            <div className="agency-bottom">
                {
                    taskList && taskList.length > 0 ?
                        taskList && taskList.map((item,index)=>{
                            return renderTaskList(item,index)
                        })
                        :
                        <div className="homePage-empty">
                            <EmptyText/>
                        </div>
                }
            </div>
        </div>
    )
}

export default Agency