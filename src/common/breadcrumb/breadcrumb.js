import React from "react";
import {Breadcrumb} from "antd";
import {withRouter} from "react-router-dom";

// 面包屑
const BreadcrumbContent = props =>{
    const {style,config,type,firstItem,secondItem} = props
    const renderBreadcrumb = type => {
        switch (type) {
            case "project":
                return  <div style={style} className={config ? "config-top-breadcrumb": "breadcrumb"}>
                            <Breadcrumb separator=">">
                                <Breadcrumb.Item
                                    style={{ cursor: "pointer" }}
                                    onClick={()=>props.history.push("/index/pipeline")}
                                >
                                    流水线
                                </Breadcrumb.Item>
                                <Breadcrumb.Item style={{ cursor: "pointer" }}>
                                    { localStorage.getItem("pipelineName") }
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
            case "system":
                return  <div className="breadcrumb">
                            <Breadcrumb separator=">">
                                <Breadcrumb.Item> {firstItem} </Breadcrumb.Item>
                                {
                                    secondItem ? <Breadcrumb.Item> {secondItem} </Breadcrumb.Item> :null
                                }
                            </Breadcrumb>
                        </div>
        }
    }

    return renderBreadcrumb(type)
}

export default withRouter(BreadcrumbContent)