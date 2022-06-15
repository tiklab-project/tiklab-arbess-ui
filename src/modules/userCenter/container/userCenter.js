import React, {Fragment} from "react";
import UserCenterLeftNav from "../components/userCenterLeftNav";
import {renderRoutes} from "react-router-config";

const UserCenter = props =>{
    const {route}=props
    return(
        <Fragment>
            <UserCenterLeftNav {...props}/>
            <div>
                {renderRoutes(route.routes)}
            </div>
        </Fragment>
    )
}

export default UserCenter