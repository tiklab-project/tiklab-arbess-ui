import React, { Fragment, useEffect,useState } from "react";
import { PrivilegeSystemFeature } from 'doublekit-privilege-ui';

// 系统功能管理
const SystemFeature = props => {


    return (
        <div className="test">
            <PrivilegeSystemFeature
                {...props}
            />
        </div>
    )
}

export default SystemFeature;