import React from "react";
import {Breadcrumb} from "antd";

const SystemBreadcrumb = props =>{
    const {firstItem,secondItem} = props
    return(
        <div className='breadcrumb'>
            <Breadcrumb separator=">">
                <Breadcrumb.Item >
                    {firstItem}
                </Breadcrumb.Item>
                <Breadcrumb.Item >
                    {secondItem}
                </Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}

export default SystemBreadcrumb