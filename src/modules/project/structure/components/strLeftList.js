import React from "react";

const StrLeftList = props =>{

    const {title,index,onClick,name,state,type,createTime} = props

    return(
        <div onClick={onClick} className={`history-content-list-ul ${index===type ? "history-content-list_active": ""}`}>
            <div className="list-title">{title}</div>
            <div className="list-group">
                <div className="list-group-item">
                    <div className="list-state">状态 : {state}</div>
                    <div className="list-one">执行人 : {name}</div>
                </div>
                <div className="list-time"> 执行时间 : {createTime}</div>
            </div>
        </div>
    )
}

export default StrLeftList