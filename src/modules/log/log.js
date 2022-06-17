import React from "react";
import SystemBreadcrumb from "../system/breadcrumb/systemBreadcrumb";

const Log = props =>{
    return(
        <div className='systemMore-log'>
            <SystemBreadcrumb
                firstItem={'其他'}
                secondItem={'系统日志'}
            />
        </div>
    )
}

export default Log