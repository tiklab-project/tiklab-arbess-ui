import React  from 'react'
import './pipelineSys.scss'
import {renderRoutes} from "react-router-config";
import PipelineSysLeftNav from "../components/pipelineSysLeftNav";

const PipelineSys= props=>{
    const {route}=props
    return(
        <div className='pipelineSys'>
            <div className='pipelineSys-content'>
                <PipelineSysLeftNav {...props}/>
                <div className='pipelineSys-content-right'>
                    {renderRoutes(route.routes)}
                </div>
            </div>
        </div>
    )
}

export default PipelineSys