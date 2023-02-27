import React from "react";
import "./Tabs.scss";

const Tabs = props =>{

    const {tabLis,type,onClick} = props

    const renderTabItem = item =>{
        return  <div
                    key={item.id}
                    className={`mf-tab ${type===item.id?"mf-active-tab":null}`}
                    onClick={()=>onClick(item)}
                >
                    {item.title}
                </div>
    }

    return (
        <div className="mf-tabs">
            {
                tabLis.map(item=>renderTabItem(item))
            }
        </div>
    )
}

export default Tabs
