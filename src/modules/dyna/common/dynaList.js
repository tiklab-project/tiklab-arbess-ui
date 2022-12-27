import React from "react";
import {withRouter} from "react-router-dom";
import EmptyText from "../../common/emptyText/emptyText";
import "./dynaList.scss";
/* 日志模板需要的图片 */
import pip_pipeline from "../../../assets/images/svg/pip_pipeline.svg";
import pip_config from "../../../assets/images/svg/pip_config.svg";
import pip_run from "../../../assets/images/svg/pip_run.svg";
import pip_helmet from "../../../assets/images/svg/pip_helmet.svg";

const DynaList = props =>{

    const {dynamicList} = props

    const dynaGo = item =>{
        props.history.push(item.link.split("#")[1])
    }

    const renderLis = (item,index) => {
        return <div key={index} className="dynamic-item" onClick={()=>dynaGo(item)}>
            <div
                dangerouslySetInnerHTML={{__html: item.data}}
            />
            <div className="dynamic-item-time">{item.timestamp}</div>
        </div>
    }

    return (
        <div className="dynamic-center">
            {
                dynamicList && dynamicList.length>0?
                dynamicList.map((item,index)=>{
                    return renderLis(item,index)
                })
                :
                <EmptyText title={"没有近期动态"}/>
            }
        </div>
    )
}

export default withRouter(DynaList)