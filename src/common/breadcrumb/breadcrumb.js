import React from "react";
import "./breadcrumb.scss";

// 面包屑
const BreadcrumbContent = props =>{

    const {firstItem,secondItem} = props

    return  <div className={"breadcrumbContent --mf-first-level-title"}>
                <span className={secondItem ? "--mf-auxiliary-color":""}>
                    {firstItem}
                </span>
                {secondItem ? <span>&nbsp; &gt; &nbsp;{secondItem}</span>:null}
            </div>
}

export default BreadcrumbContent