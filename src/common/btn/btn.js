import React from "react";
import "./btn.scss";

const Btn = props =>{

    const {icon,type,title,onClick,isMar} = props

    return(
        <div
            className={`mf-btn ${type?`mf-btn-${type}`:""} ${isMar?"mf-btn-mar":""}`}
            onClick={onClick}
        >
            <span className={`${icon?"mf-btn-icon":""}`}>{icon && icon}</span>
            <span>{title}</span>
        </div>
    )
}

export default Btn