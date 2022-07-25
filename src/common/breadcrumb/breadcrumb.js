import React from "react";
import "./breadcrumb.scss";
import {Breadcrumb} from "antd";
import {withRouter} from "react-router-dom";

// 面包屑
const BreadcrumbContent = props =>{

    const {config,type,firstItem,secondItem,match} = props
    const renderBreadcrumb = type => {
        switch (type) {
            case "project":
                return  <div className={config ? "breadcrumb-topOver": "breadcrumb"}>
                            <Breadcrumb separator=">">
                                <Breadcrumb.Item>流水线</Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    {match.params.pipelineName}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
            case "system":
                return  <div className="breadcrumb">
                            <Breadcrumb separator=">">
                                <Breadcrumb.Item>{firstItem}</Breadcrumb.Item>
                                {secondItem?<Breadcrumb.Item>{secondItem}</Breadcrumb.Item>:null}
                            </Breadcrumb>
                        </div>
        }
    }

    return renderBreadcrumb(type)

}

export default withRouter(BreadcrumbContent)