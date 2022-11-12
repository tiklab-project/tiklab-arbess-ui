import React from "react";
import {inject,observer} from "mobx-react";
import BreadcrumbContent from "../common/breadcrumb/breadcrumb";

const Dyna = props =>{

    const goBack = () => props.history.push(`/index/home`)

    return(
        <div className="home-limited">
            <BreadcrumbContent
                firstItem={"动态详情"}
                goBack={goBack}
            />
        </div>
    )
}

export default Dyna