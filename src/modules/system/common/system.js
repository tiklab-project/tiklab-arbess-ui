import React from "react";
import "./system.scss";
import SystemAside from "./systemAside";
import {withRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";

const System = props =>{
    const {route}=props
    return(
        <div className="system">
            <SystemAside {...props} />
            <div className="system-content">
                {renderRoutes(route.routes)}
            </div>
        </div>
    )
}

export default withRouter(System)