import React from "react";
import {Breadcrumb} from "antd";

const SystemBreadcrumb = props =>{
    const {firstItem,secondItem} = props
    return(
        <div className = 'breadcrumb'>
            <Breadcrumb separator=">">
                <Breadcrumb.Item style={{ cursor: "pointer" }} >
                    {firstItem}
                </Breadcrumb.Item>
                <Breadcrumb.Item style={{ cursor: "pointer" }}>
                    {secondItem}
                </Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}

export default SystemBreadcrumb