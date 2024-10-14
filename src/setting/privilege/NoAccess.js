import React from 'react';
import {NoAccess} from "tiklab-privilege-ui";

const NoAccessContent = props =>{
    return (
        <NoAccess
            {...props}
            homePath={'/'}
        />
    )
}

export default NoAccessContent
