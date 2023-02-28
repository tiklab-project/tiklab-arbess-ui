import React from "react";
import {Space} from "antd";
import "./Btn.scss";

/**
 * 操作按钮
 * @param icon：图标
 * @param type：按钮类型
 * @param title：内容
 * @param onClick：事件
 * @param isMar：boolean（true:右边距;）
 * @returns {JSX.Element}
 * @constructor
 */
const Btn = ({icon,type,title,onClick,isMar}) =>{

    return (
        <div className={`mf-btn ${type?`mf-btn-${type}`:""} ${isMar?"mf-btn-mar":""}`} onClick={onClick}>
            <Space>
                {
                    icon &&  <span className="mf-btn-icon">{icon}</span>
                }
                {title}
            </Space>
        </div>
    )
}

export default Btn
