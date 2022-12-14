import React from "react";
import ProjectSetAside from "./projectSetAside";
import {renderRoutes} from "react-router-config";
import {withRouter} from "react-router-dom";

const ProjectSet = props =>{

    const {route} = props

    return(
        <div className="projectSet">
            <ProjectSetAside{...props}/>
            <div className="projectSet-content">
                {renderRoutes(route.routes)}
            </div>
        </div>
    )
}

export default withRouter(ProjectSet)