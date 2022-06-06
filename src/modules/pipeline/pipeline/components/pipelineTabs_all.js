import React from "react";
import {Table } from "antd";

const PipelineTabs_all= props=>{

    const {pipelineList,columns,rowKey} = props

    return(
       <div shouldupdate='true'>
           <Table
               rowKey={rowKey}
               columns={columns}
               dataSource={pipelineList}
           />
       </div>
    )
}

export default PipelineTabs_all;