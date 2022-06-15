import React from "react";
import {getUser} from "doublekit-core-ui";
import SystemBreadcrumb from "../../system/systemBreadcrumb";

const UserCenterBase = props =>{
    return(
        <div className='userCenter-base'>
            <SystemBreadcrumb
                firstItem={'用户中心'}
                secondItem={'基本信息'}
            />
            <div className='userCenter-base-content'>
                <div className='userCenter-base-content_name'>
                    <span>用户名</span>
                    <span>{getUser().name}</span>
                </div>
                <div className='userCenter-base-content_email'>
                    <span>邮箱</span>
                    <span>{getUser().email}</span>
                </div>
                <div className='userCenter-base-content_phone'>
                    <span>联系方式</span>
                    <span>{getUser().phone}</span>
                </div>
            </div>
        </div>
    )
}

export default UserCenterBase