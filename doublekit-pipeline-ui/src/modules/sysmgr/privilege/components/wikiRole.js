import React, { Fragment, useEffect,useState } from "react";
import { PrivilegeProjectRole } from 'doublekit-privilege-ui';

const WikiRole = props => {

    return (
        <div className="test">
            <PrivilegeProjectRole
                group={'system'}
                {...props}
            />
        </div>
    )
}

export default WikiRole;