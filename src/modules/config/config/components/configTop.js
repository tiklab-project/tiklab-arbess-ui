import React from "react";
import { Breadcrumb } from 'antd';


const ConfigTop = () =>{

    const  piplelineName = localStorage.getItem('pipelineName')

    return(
        <Breadcrumb  className='config-details-top'>
            <Breadcrumb.Item>流水线</Breadcrumb.Item>
            <Breadcrumb.Item>
                {piplelineName}
            </Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default ConfigTop