import React from "react";
import {Space} from "antd";
import "./Btn.scss";

/**
 * 操作按钮
 */
const Btn = ({icon,type,title,onClick,isMar,children}) =>{

    return (
        <div className={`arbess-btn ${type?`arbess-btn-${type}`:""} ${isMar?"arbess-btn-mar":""}`} onClick={onClick}>
            <Space>
                {icon &&  <span className="arbess-btn-icon">{icon}</span>}
                {children ? children : title}
            </Space>
        </div>
    )
}

export default Btn
