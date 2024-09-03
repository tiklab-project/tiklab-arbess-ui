import React from "react";
import "./ListIcon.scss";

/**
 * 表格标题首字母
 */
const ListIcon = ({text,colors,isMar=true}) => {

    return (
        <span className={`arbess-listname-icon ${colors?`arbess-icon-${colors}`:"arbess-icon-1"} ${isMar?'arbess-listname-icon-mar':''}`}>
            {text ? text.substring(0,1).toUpperCase() : 'M'}
        </span>
    )
}

export default ListIcon
