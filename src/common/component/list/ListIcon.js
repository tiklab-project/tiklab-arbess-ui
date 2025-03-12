/**
 * @Description: 图标
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/11
 */
import React from "react";
import "./ListIcon.scss";


const ListIcon = ({text,colors,isMar=true}) => {

    /**
     * 获取首字母
     * @returns {string|string|string}
     */
    const getFirstChar = () => {
        if (!text || typeof text !== "string") return "A";
        let trimmed = text.trim();
        let firstChar = trimmed[0] || "A";
        return /[a-z]/.test(firstChar) ? firstChar.toUpperCase() : firstChar;
    }

    //背景类样式;
    const bgClass = colors ? `arbess-icon-${colors}` : "arbess-icon-1";
    //边距类样式;
    const marClass = isMar ? `arbess-listname-icon-mar` : "";

    return (
        <span className={`arbess-listname-icon ${bgClass} ${marClass}`}>
            {getFirstChar()}
        </span>
    )
}

export default ListIcon
