import React from 'react';
import {NoAccess} from "thoughtware-privilege-ui";

const NoAccessContent = props =>{
    return (
        <NoAccess
            {...props}
            homePath={'/'}
        />
    )
}

export default NoAccessContent
