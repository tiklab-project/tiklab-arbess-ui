import React from "react";
import {withRouter} from "react-router-dom";
import {RightOutlined} from "@ant-design/icons";
import "./Guide.scss";

/**
 * 动态，代办……小标题
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Guide = props =>{

    const {title,type,icon,pipelineId} = props

    // 路由跳转
    const goDetails = title =>{
        switch (title) {
            case "我的待办":
                props.history.push("/index/agency")
                break
            case "近期动态":
                props.history.push("/index/dyna")
                break
            case "流水线动态":
                props.history.push(`/index/pipeline/${pipelineId}/survey/dyna`)
        }
    }

    return (
        <div className="mf-guide">
            <div className="mf-guide-title">
                <span className="mf-guide-title-icon">{icon && icon}</span>
                <span className="mf-guide-title-name">{title}</span>
            </div>
            {
                type && type.total > 1 &&
                <div className="mf-guide-ac">
                    <span onClick={()=>goDetails(title)}>
                        <RightOutlined />
                    </span>
                </div>
            }
        </div>
    )
}

export default withRouter(Guide)
