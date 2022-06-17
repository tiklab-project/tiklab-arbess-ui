import React from "react";
import SystemBreadcrumb from "../../system/systemBreadcrumb";

const PlugDeploy = props =>{
    return (
        <div className='plug-deploy'>
            <SystemBreadcrumb
                firstItem={'插件库'}
                secondItem={'配置'}
            />
        </div>
    )
}

export default PlugDeploy