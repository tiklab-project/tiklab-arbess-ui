import React from "react";
import "./breadcrumb.scss";

// 面包屑
const BreadcrumbContent = props =>{

    const {config,firstItem,secondItem} = props

    return  <div className={config ? "breadcrumb-topOver": "breadcrumb"}>
                <span className={secondItem ? "breadcrumb-span":""}>{firstItem}</span>
                {secondItem ? <span>&nbsp; &gt; &nbsp;{secondItem}</span>:null}
            </div>

}

export default BreadcrumbContent