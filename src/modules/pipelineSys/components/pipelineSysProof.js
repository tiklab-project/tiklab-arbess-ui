import React, {Fragment, useEffect, useState} from "react";
import {inject,observer} from "mobx-react";
import { Table} from "antd";
import AddProofButton from "../../proof/addProofButton";
import PipelineDetailsBreadcrumb from "../../pipelineDetails/components/pipelineDetailsBreadcrumb";

const PipelineSysProof = props =>{

    const {proofStore} = props
    const {findPipelineProof,pipelineProofList} = proofStore

    const pipelineId = localStorage.getItem('pipelineId')

    useEffect(()=>{
        findPipelineProof(pipelineId)
    },[])

    const columns = [
        {
            title:'类型',
            dataIndex:'proofType',
            key:'proofType'
        },
        {
            title:'名称',
            dataIndex:'proofName',
            key:'proofName'
        },
        {
            title:'拥有者',
            dataIndex:'username',
            key:'username',
        },
        {
            title:'创建时间',
            dataIndex:'proofCreateTime',
            key:'proofCreateTime'
        },
        {
            title:'备注',
            dataIndex:'proofDescribe',
            key:'proofDescribe'
        },
        {
            title:'操作',
            dataIndex:'action',
            key:'action',
            render:(text,record,index)=>{
                return(
                    <span className='pipelineSys-proof-content-action'>
                        <span className='action- edit'>编辑</span>
                        <span className='action- del'>删除</span>
                    </span>
                )
            }
        }
    ]

    const style = 'primary'

    return(
       <Fragment>
           <PipelineDetailsBreadcrumb />
           <div className='pipelineSys-proof'>
               <div className='pipelineSys-proof-content'>
                   <div className='pipelineSys-proof-content-btn'>
                       <AddProofButton codeType={31} style={style}/>
                   </div>
                   <Table
                       bordered
                       rowKey={record => record.proofId}
                       columns={columns}
                       dataSource={pipelineProofList}
                       pagination={{ pageSize: 12}}
                   />
               </div>
           </div>
       </Fragment>
    )
}

export default inject('proofStore')(observer(PipelineSysProof))