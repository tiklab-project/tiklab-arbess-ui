import React,{Fragment} from "react";
import SecondarySubMenu from "../asideMenu/secondarySubMenu";
import {renderRoutes} from "react-router-config";

const SecondarySubMenuRender = props =>{
    const {route,secureRouter,type,className} = props
    return(
        <Fragment>
            <SecondarySubMenu secureRouter={secureRouter} type={type} {...props}/>
            <div className={className}>
                {renderRoutes(route.routes)}
            </div>
        </Fragment>
    )
}

export default SecondarySubMenuRender