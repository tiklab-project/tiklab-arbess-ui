import React,{Fragment} from "react";
import SecondaryMenu from "../asideMenu/secondaryMenu";
import {renderRoutes} from "react-router-config";

const SecondaryMenuRender = props =>{
    const {router,nav,route,className} = props
    return(
        <Fragment>
            <SecondaryMenu {...props} router={router} nav={nav}/>
            <div className={className}>
                {renderRoutes(route.routes)}
            </div>
        </Fragment>
    )
}

export default SecondaryMenuRender