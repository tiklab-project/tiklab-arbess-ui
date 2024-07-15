import React from "react";
import "./ListIcon.scss";

/**
 * 表格标题首字母
 */
const ListIcon = ({text,colors,isMar=true}) => {

    return (
        <span className={`mf-listname-icon ${colors?`mf-icon-${colors}`:"mf-icon-1"} ${isMar?'mf-listname-icon-mar':''}`}>
            {text && text.substring(0,1).toUpperCase()}
        </span>
    )
}

export default ListIcon
