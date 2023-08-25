import React from "react";
import {Space} from "antd"
import {LeftOutlined} from "@ant-design/icons";
import "./Breadcrumb.scss";

/**
 * 面包屑
 */
const Breadcrumb = ({firstItem,secondItem,onClick,children}) =>{

    return  <div className="mf-breadcrumb">
                <Space>
                    <span className={onClick ? "mf-breadcrumb-first":""} onClick={onClick}>
                        {onClick && <LeftOutlined style={{marginRight:8}}/>}
                        <span className={secondItem ? "mf-breadcrumb-span":""}>
                            {firstItem}
                        </span>
                    </span>
                    {secondItem && <span> / &nbsp; {secondItem}</span>}
                </Space>
                <div>{children}</div>
            </div>
}

export default Breadcrumb
