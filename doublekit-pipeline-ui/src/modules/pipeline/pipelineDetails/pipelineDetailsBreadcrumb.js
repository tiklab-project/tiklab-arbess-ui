import React from "react";
import { Breadcrumb } from 'antd';
import {withRouter} from "react-router-dom";

const PipelineDetailsBreadcrumb = props => {
    return(
        <Breadcrumb className='breadcrumb'>
            <Breadcrumb.Item
                style={{ cursor: "pointer" }}
                onClick={()=>props.history.push('/home/pipeline')}
            >
                流水线
            </Breadcrumb.Item>
            <Breadcrumb.Item
                style={{ cursor: "pointer" }}
            >
                {localStorage.getItem('pipelineName')}
            </Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default withRouter(PipelineDetailsBreadcrumb)