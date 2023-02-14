import React from "react";
import "./breadcrumb.scss";
import {Space} from "antd"
import {LeftOutlined} from "@ant-design/icons";

const BreadcrumbContent = props =>{

    const {firstItem,secondItem,goBack} = props

    return  <div className={"breadcrumbContent"}>
                <Space>
                    {goBack && <LeftOutlined onClick={goBack} style={{color:"#0063FF"}}/>}
                    <span className={secondItem ? "breadcrumbContent-span":""}>
                        {firstItem}
                    </span>
                    {secondItem && <span> / &nbsp; {secondItem}</span>}
                </Space>
            </div>
}

export default BreadcrumbContent
