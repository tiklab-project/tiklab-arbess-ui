import React from "react";
import {Breadcrumb} from "antd";

const SystemBreadcrumb = props =>{
    const {firstItem,secondItem} = props
    return(
        <div className='breadcrumb'>
            <Breadcrumb separator=">">
                <Breadcrumb.Item> {firstItem} </Breadcrumb.Item>
                {
                    secondItem ? <Breadcrumb.Item> {secondItem} </Breadcrumb.Item> :null
                }
            </Breadcrumb>
        </div>
    )
}

export default SystemBreadcrumb