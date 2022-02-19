import React,{ useEffect } from "react";
import {Table} from "antd";
import {withRouter} from "react-router-dom";
import {observer,inject} from "mobx-react";

const PipelineAll= props=>{

    const {PIPELINE_STORE}=props
    const {selectPipelineStatus,pipelineList}=PIPELINE_STORE

    useEffect(()=>{
        selectPipelineStatus()
    },[])

    const goPipelineTask=(text,record)=>{
        localStorage.setItem('pipelineName',text)
        localStorage.setItem('pipelineId',record.pipelineId)
        props.history.push('/home/task/work')
    }

    const columns = [
        {
            title: '收藏',
            dataIndex: 'collection',
            key:"collection",
            render:()=>{
                return(
                    <span>
                        收藏
                    </span>
                )
            }
        },
        {
            title: '最近构建状态',
            dataIndex: 'structureStatus',
            key: 'structureStatus',
        },
        {
            title: '任务名',
            dataIndex: 'pipelineName',
            key: 'pipelineName',
            render:(text,record)=>{
                return(
                    <span
                        onClick={()=>
                            goPipelineTask(text,record)
                        }
                        className = "span-bottom"
                    >
                        {text}
                    </span>
                )
            }
        },
        {
            title: '上次构建时间',
            dataIndex: 'lastStructureTime',
            key: 'lastStructureTime',
        },
        {
            title: '上次成功时间',
            dataIndex: 'lastSuccessTime',
            key: 'lastSuccessTime',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key:"action",
            render:()=>{
                return(
                    <>
                        运行
                    </>
                )
            }
        },
    ];
    return(
            <Table
                rowKey={record => record.pipelineId}
                columns={columns}
                dataSource={pipelineList}
            />
    )
}

export default withRouter(inject('PIPELINE_STORE')(observer(PipelineAll)));