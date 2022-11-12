import React from "react";
import BreadcrumbContent from "../common/breadcrumb/breadcrumb";

const Agency = props =>{

    const goBack = () => props.history.push("/index/home")

    return(
        <div className="home-limited">
            <BreadcrumbContent
                firstItem={"代办任务"}
                goBack={goBack}
            />
        </div>
    )
}

export default Agency