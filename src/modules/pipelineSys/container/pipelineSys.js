import React, {Fragment} from 'react'
import './pipelineSys.scss'
import {observer,inject} from "mobx-react";
import PipelineSysLeft from "../components/pipelineSysLeft";
import PipelineSysRight from "../components/pipelineSysRight";
import PipelineDetailsBreadcrumb from "../../pipelineDetails/components/pipelineDetailsBreadcrumb";

/*
 * 流水线设置
 */
const PipelineSys= props=>{

    const {pipelineStore}=props
    const {deletePipeline,updatePipeline,pipelineList}=pipelineStore
    const pipelineId=localStorage.getItem('pipelineId')

    return(
        <Fragment>
            <PipelineDetailsBreadcrumb/>
            <div className='pipelineSys'>
               <div className='pipelineSys-content'>
                   <PipelineSysLeft/>
                   <PipelineSysRight
                       pipelineId={pipelineId}
                       deletePipeline={deletePipeline}
                       updatePipeline={updatePipeline}
                       pipelineList={pipelineList}
                   />
               </div>
            </div>
        </Fragment>
    )
}

export default inject('pipelineStore')(observer(PipelineSys))