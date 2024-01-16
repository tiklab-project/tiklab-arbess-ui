import React from "react";
import "./ListIcon.scss";

/**
 * 表格标题首字母
 */
const ListIcon = ({text,colors}) => {

    return (
        <span className={`mf-listname-icon ${colors?`mf-icon-${colors}`:"mf-icon-1"}`}>
            {text && text.substring(0,1).toUpperCase()}
        </span>
    )
}

export default ListIcon
