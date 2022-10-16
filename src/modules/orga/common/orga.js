import React from "react";
import "./orga.scss";
import OrgaAside from "./orgaAside";
import {withRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";


const Orga = props =>{
    const {route}=props
    return(
        <div className="orga">
            <OrgaAside {...props} />
            <div className="orga-background" style={{marginLeft:200}}>
                {renderRoutes(route.routes)}
            </div>
        </div>
    )
}

export default withRouter(Orga)