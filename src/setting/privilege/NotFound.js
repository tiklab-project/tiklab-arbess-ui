import React from "react";
import {NotFound} from "thoughtware-privilege-ui";

const NotFoundContent = props =>{
    const {route} = props;
    return <NotFound {...props} type={route.path==='/404'?'404':'noaccess'}/>
}

export default NotFoundContent
