import React from 'react';
import {NotFound} from "tiklab-eam-ui";

const NotFoundContent = props =>{
    return (
        <NotFound
            {...props}
            homePath={'/'}
        />
    )
}

export default NotFoundContent
