import React from "react";
import {withRouter} from "react-router-dom";
import EmptyText from "../emptyText/EmptyText";
import "./DynamicList.scss";

/**
 * 动态列表
 */
const DynamicList = props =>{

    const {dynamicList} = props

    // 动态路由跳转
    const goDynaLink = item =>{
        props.history.push(item.link.split("#")[1])
    }

    // 渲染动态列表
    const renderLis = (item,index) => {
        return  <div key={index} className="dynamic-item" onClick={()=>goDynaLink(item)}>
                    <div dangerouslySetInnerHTML={{__html: item.data}}/>
                    <div className="dynamic-item-time">{item.createTime}</div>
                </div>
    }

    return (
        <div className="dynamic-center">
            {
                dynamicList && dynamicList.length>0 ?
                dynamicList.map((item,index)=>renderLis(item,index))
                :
                <EmptyText title={"暂无近期动态"}/>
            }
        </div>
    )
}

export default withRouter(DynamicList)
