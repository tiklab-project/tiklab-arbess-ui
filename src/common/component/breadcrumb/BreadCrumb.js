import React from "react";
import {Space} from "antd"
import {LeftOutlined} from "@ant-design/icons";
import "./BreadCrumb.scss";

/**
 * 面包屑
 */
const BreadCrumb = ({crumbs=[],children}) =>{

    return (
        <div className="arbess-breadcrumb">
            <Space>
                {
                    crumbs.map((item,index)=>{
                        const {title=null,click} = item;
                        const isLast = crumbs.length - 1 ===  index;
                        return (
                            <React.Fragment key={index}>
                                <span key={index} className={click ? "arbess-breadcrumb-first":""} onClick={click}>
                                    {click && index===0 && <LeftOutlined style={{marginRight:8}}/>}
                                    <span className={isLast ? "":"arbess-breadcrumb-span"}>
                                        {title}
                                    </span>
                                </span>
                                { !isLast && <span> /  </span>}
                            </React.Fragment>
                        )
                    })
                }
            </Space>
            <div>{children}</div>
        </div>

    )
}

export default BreadCrumb
