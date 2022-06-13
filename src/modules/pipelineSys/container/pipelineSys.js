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

    const style = {
        'paddingLeft':'16px',
    }

    return(
        <div className='pipelineSys'>
            <div className='pipelineSys-content'>
                <PipelineSysLeft/>
                <div className='pipelineSys-content-right'>
                    <PipelineDetailsBreadcrumb style={style}/>
                    <PipelineSysRight
                        pipelineId={pipelineId}
                        deletePipeline={deletePipeline}
                        updatePipeline={updatePipeline}
                        pipelineList={pipelineList}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject('pipelineStore')(observer(PipelineSys))