/**
 * @Description: 按钮
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from "react";
import {Space} from "antd";
import "./Button.scss";

const Button = ({icon,type,title,onClick,isMar,children}) =>{

    return (
        <div className={`arbess-btn ${type ? `arbess-btn-${type}`:"" } ${isMar? "arbess-btn-mar":""}`} onClick={onClick}>
            <Space>
                {icon &&  <span className="arbess-btn-icon">{icon}</span>}
                {children ? children : title}
            </Space>
        </div>
    )
}

export default Button
