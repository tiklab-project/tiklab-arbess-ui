import React from "react";
import ProjectSetAside from "./projectSetAside";
import {renderRoutes} from "react-router-config";

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

export default ProjectSet