import React from "react";
import {renderRoutes} from "react-router-config";
import './system.scss';
import SystemAside from "../components/systemAside";

const System = props =>{

    const {route}=props

    return(
        <div className='system'>
            <SystemAside/>
            <div className='system-content'>
                {renderRoutes(route.routes)}
            </div>
        </div>
    )
}

export default System