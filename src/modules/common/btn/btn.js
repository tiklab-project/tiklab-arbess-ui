import React from "react";
import {Space} from "antd";
import "./btn.scss";

const Btn = props =>{

    const {icon,type,title,onClick,isMar} = props

    return  <div
                className={`mf-btn ${type?`mf-btn-${type}`:""} ${isMar?"mf-btn-mar":""}`}
                onClick={onClick}
            >
                <Space>
                    {
                        icon &&  <span className="mf-btn-icon">{icon}</span>
                    }
                    {title}
                </Space>
            </div>
}

export default Btn
