import React from "react";
import SystemBreadcrumb from "../breadcrumb/systemBreadcrumb";

const PlugUpdate = props =>{
    return (
        <div className='plug-update'>
            <SystemBreadcrumb
                firstItem={'插件库'}
                secondItem={'可更新'}
            />
        </div>
    )
}

export default PlugUpdate