import React from "react";
import SystemBreadcrumb from "../system/breadcrumb/systemBreadcrumb";

const Info = props =>{
    return(
        <div className='systemMore-info'>
            <SystemBreadcrumb
                firstItem={'其他'}
                secondItem={'系统信息'}
            />
        </div>
    )
}

export default Info