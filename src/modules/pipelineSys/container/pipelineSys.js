import React  from 'react'
import './pipelineSys.scss'
import {observer,inject} from "mobx-react";
import {renderRoutes} from "react-router-config";
import PipelineSysLeftNav from "../components/pipelineSysLeftNav";
import PipelineDetailsBreadcrumb from "../../pipelineDetails/components/pipelineDetailsBreadcrumb";
import {withRouter} from "react-router";

const PipelineSys= props=>{

    const {route}=props
    const style = {
        'paddingLeft':'16px',
    }

    return(
        <div className='pipelineSys'>
            <div className='pipelineSys-content'>
                <PipelineSysLeftNav {...props}/>
                <div className='pipelineSys-content-right'>
                    {/*<PipelineDetailsBreadcrumb style={style}/>*/}
                    {renderRoutes(route.routes)}
                </div>
            </div>
        </div>
    )
}

export default withRouter(inject('pipelineStore')(observer(PipelineSys)))