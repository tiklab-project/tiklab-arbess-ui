import React, { Fragment, useEffect,useState } from "react";
import { PrivilegeSystemRole } from 'doublekit-privilege-ui';

const SystemRole = props => {


    return (
        <div className="test">
            <PrivilegeSystemRole
                {...props}
                group={'system'}
            />
        </div>
    )
}

export default SystemRole;