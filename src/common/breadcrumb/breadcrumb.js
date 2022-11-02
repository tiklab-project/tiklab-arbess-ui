import React from "react";
import "./breadcrumb.scss";

// 面包屑
const BreadcrumbContent = props =>{

    const {firstItem,secondItem} = props

    return  <div className={"breadcrumbContent"}>
                <span className={secondItem ? "breadcrumbContent-span":""}>
                    {firstItem}
                </span>
                {secondItem ? <span>&nbsp; &gt; &nbsp;{secondItem}</span>:null}
            </div>
}

export default BreadcrumbContent