import React from "react";
import { Breadcrumb } from "antd";
import {withRouter} from "react-router-dom";

const ProjectBreadcrumb = props => {
    const {style,config} = props
    return(
        <div style={style} className={config ? "config-top-breadcrumb": "breadcrumb"}>
            <Breadcrumb separator=">">
                <Breadcrumb.Item
                    style={{ cursor: "pointer" }}
                    onClick={()=>props.history.push("/index/pipeline")}
                >
                    流水线
                </Breadcrumb.Item>
                <Breadcrumb.Item style={{ cursor: "pointer" }}>
                    {localStorage.getItem("pipelineName")}
                </Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}

export default withRouter(ProjectBreadcrumb)