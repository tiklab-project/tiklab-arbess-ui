import React from "react";
import "./breadcrumb.scss";
import {Breadcrumb} from "antd";

// 面包屑
const BreadcrumbContent = props =>{

    const {config,firstItem,secondItem} = props

    return  <div className={config ? "breadcrumb-topOver": "breadcrumb"}>
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>{firstItem}</Breadcrumb.Item>
                    {secondItem ? <Breadcrumb.Item>{secondItem}</Breadcrumb.Item>:null}
                </Breadcrumb>
            </div>

}

export default BreadcrumbContent