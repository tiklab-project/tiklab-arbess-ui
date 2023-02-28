import React from "react";
import {withRouter} from "react-router-dom";
import EmptyText from "../emptyText/EmptyText";
import "./DynamicList.scss";
/* 日志模板需要的图片 */
import pip_pipeline from "../../assets/images/svg/pip_pipeline.svg";
import pip_config from "../../assets/images/svg/pip_config.svg";
import pip_run from "../../assets/images/svg/pip_run.svg";
import pip_helmet from "../../assets/images/svg/pip_helmet.svg";

/**
 * 动态列表
 * @param props
 * @returns 动态列表
 * @constructor
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
                    <div className="dynamic-item-time">{item.timestamp}</div>
                </div>
    }

    return (
        <div className="dynamic-center">
            {
                dynamicList && dynamicList.length>0?
                dynamicList.map((item,index)=>renderLis(item,index))
                :
                <EmptyText title={"暂无近期动态"}/>
            }
        </div>
    )
}

export default withRouter(DynamicList)
