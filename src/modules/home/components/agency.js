import React from "react";
import {ShareAltOutlined,UserOutlined,ArrowRightOutlined} from "@ant-design/icons";
import Guide from "./guide";

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
                    {item.createUser}
                </span>
                <span className="user-arrow">
                    <ArrowRightOutlined />
                </span>
                <span>
                    <UserOutlined/>
                </span>
                <span className="user-create execUser">
                    {item.execUser}
                </span>
            </div>
        )
    }

    const renderState = item =>{
        return  <div className={`agency-item-state state-${item.state}`}>
                    {state(item.state)}
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
                    taskList && taskList.map((item,index)=>{
                        return(
                            <div key={index} className="agency-bottom-list"
                                 onClick={()=>props.history.push("/index/system/myTodoTask")}
                            >
                               <div className="agency-item">
                                   <div className="agency-item-title">
                                        <span className="title-icon">
                                            <ShareAltOutlined/>
                                        </span>
                                       <span className="title-name">
                                            {item.taskName}
                                       </span>
                                   </div>
                                   {renderUser(item)}
                                   {renderState(item)}
                                   <div className="agency-item-time">
                                       {item.endTime}
                                   </div>
                               </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Agency