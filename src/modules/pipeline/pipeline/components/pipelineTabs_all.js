import React,{ useEffect,useState } from "react";
import {Table,Tooltip } from "antd";
import {withRouter} from "react-router";
import {observer,inject} from "mobx-react";

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

export default withRouter(inject('pipelineStore','structureDataStore',
                'structureStore')
                (observer(PipelineTabs_all)));