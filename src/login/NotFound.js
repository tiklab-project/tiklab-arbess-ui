import React from 'react';
import {NotFound} from "thoughtware-eam-ui";

const NotFoundContent = props =>{
    return (
        <NotFound
            {...props}
            homePath={'/'}
        />
    )
}

export default NotFoundContent
