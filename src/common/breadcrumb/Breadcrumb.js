import React from "react";
import {Space} from "antd"
import {LeftOutlined} from "@ant-design/icons";
import "./Breadcrumb.scss";

/**
 * 面包屑
 * @param firstItem：标题1
 * @param secondItem：标题2
 * @param goBack：事件
 * @returns {JSX.Element}
 * @constructor
 */
const BreadcrumbContent = ({firstItem,secondItem,goBack}) =>{

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
