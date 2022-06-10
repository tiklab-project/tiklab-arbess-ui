import React from "react";
import { Breadcrumb } from 'antd';

const ConfigTop = () =>{

    return(
        <Breadcrumb  className='config-top'>
            <Breadcrumb.Item>流水线</Breadcrumb.Item>
            <Breadcrumb.Item>{localStorage.getItem('pipelineName')}</Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default ConfigTop