/**
 * @Description: 标签
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from "react";
import "./Tabs.scss";

const Tabs = props =>{

    const {tabLis,type,onClick} = props

    return (
        <div className="arbess-tabs">
            {
                tabLis.map(item=>(
                    <div
                        key={item.id}
                        className={`arbess-tab ${type===item.id?"arbess-active-tab":""}`}
                        onClick={type===item.id ? undefined : ()=>onClick(item)}
                    >{item.title}</div>
                ))
            }
        </div>
    )
}

export default Tabs
