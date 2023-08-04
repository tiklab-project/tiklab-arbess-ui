import React from "react";
import {Space} from "antd";
import "./Btn.scss";

/**
 * 操作按钮
 */
const Btn = ({icon,type,title,onClick,isMar,children}) =>{

    return (
        <div className={`mf-btn ${type?`mf-btn-${type}`:""} ${isMar?"mf-btn-mar":""}`} onClick={onClick}>
            <Space>
                {
                    icon &&  <span className="mf-btn-icon">{icon}</span>
                }
                {
                    children ? children : title
                }
            </Space>
        </div>
    )
}

export default Btn
