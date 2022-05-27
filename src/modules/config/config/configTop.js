import React from "react";
import { Breadcrumb } from 'antd';

const ConfigTop = () =>{

    const  pipelineName = localStorage.getItem('pipelineName')

    return(
        <Breadcrumb  className='configView1-top'>
            <Breadcrumb.Item>流水线</Breadcrumb.Item>
            <Breadcrumb.Item>{pipelineName}</Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default ConfigTop