/**
 * @Description: 面包屑
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from "react";
import {Space} from "antd"
import {LeftOutlined} from "@ant-design/icons";
import "./BreadCrumb.scss";

const BreadCrumb = ({firstItem,secondItem,onClick,children}) =>{

    return (
        <div className="arbess-breadcrumb">
            <Space>
                <span className={onClick ? "arbess-breadcrumb-first":""} onClick={onClick}>
                    {onClick && <LeftOutlined style={{marginRight:8}}/>}
                    <span className={secondItem ? "arbess-breadcrumb-span":""}>
                        {firstItem}
                    </span>
                </span>
                {secondItem && <span> / &nbsp; {secondItem}</span>}
            </Space>
            <div>{children}</div>
        </div>
    )
}

export default BreadCrumb
