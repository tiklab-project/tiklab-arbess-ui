import React from "react";
import {renderRoutes} from "react-router-config";
import './system.scss';
import SystemAside from "../components/systemAside";

const System = props =>{

    const {route}=props

    return(
        <div className='system'>
            <div className='system-content'>
                <SystemAside/>
                <div>
                    {renderRoutes(route.routes)}
                </div>
            </div>
        </div>
    )
}

export default System