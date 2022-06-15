import React from "react";
import SystemBreadcrumb from "../../system/systemBreadcrumb";

const UserCenterView = props =>{
    return(
        <div className='userCenter-view'>
            <SystemBreadcrumb
                firstItem={'用户中心'}
                secondItem={'用户视图'}
            />
        </div>
    )
}

export default UserCenterView